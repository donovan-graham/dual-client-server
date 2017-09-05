'use strict';
const fs = require('fs');
const path = require('path');
const gm = require('gm');
const { ensureDirSync, removeSync } = require('fs-extra');

const {
  getRegressionFolderPath,
  getTargetFolderPath,
  getBaseFolderPath,
  getDiffFolderPath,
  getTmpFolderPath,
  getTmpTargetFolderPath,
  getTmpBaseFolderPath,
  getResultsFilePath,
} = require('./resolve');

const imageMagick = gm.subClass({ imageMagick: true });

function getImageSize(imagePath) {
  return new Promise(resolve => imageMagick(imagePath).size((err, size) => resolve(size)));
}

function getSizesInfo(state) {
  const { targetSrc, baseSrc } = state;
  const promises = [getImageSize(targetSrc), getImageSize(baseSrc)];

  return Promise.all(promises).then(sizes =>
    Object.assign({}, state, {
      targetSize: sizes[0],
      baseSize: sizes[1],
    })
  );
}

function compareImages(targetFilePath, baseFilePath, diffFilePath) {
  removeSync(diffFilePath);

  return new Promise(resolve => {
    function callback(err, isEqual, equality, raw) {
      resolve({
        error: err,
        noise: equality,
        value: equality === undefined ? 0 : (1 - equality) * 100,
        raw,
        file: diffFilePath,
      });
    }

    imageMagick().compare(targetFilePath, baseFilePath, { file: diffFilePath }, callback);
  });
}

function createNewImageExtent(inputFilePath, outputFilePath, width, height) {
  return new Promise(resolve =>
    imageMagick(inputFilePath)
      .gravity('NorthWest')
      .extent(width, height)
      .write(outputFilePath, () => resolve())
  );
}

function createTemporaryImages(state, tmpTargetFolderPath, tmpBaseFolderPath) {
  const { filename, targetSrc, baseSrc, targetSize, baseSize } = state;

  if (targetSize.width !== baseSize.width || targetSize.height !== baseSize.height) {
    const width = Math.max(targetSize.width, baseSize.width);
    const height = Math.max(targetSize.height, baseSize.height);

    const tmpTargetSrc = path.resolve(tmpTargetFolderPath, filename);
    const tmpBaseSrc = path.resolve(tmpBaseFolderPath, filename);

    return Promise.all([
      createNewImageExtent(targetSrc, tmpTargetSrc, width, height),
      createNewImageExtent(baseSrc, tmpBaseSrc, width, height),
    ]).then(() => Object.assign({}, state, { tmpTargetSrc, tmpBaseSrc }));
  }

  return state;
}

function imageRegression(state) {
  const targetFilePath = state.tmpTargetSrc || state.targetSrc;
  const baseFilePath = state.tmpBaseSrc || state.baseSrc;
  const diffFilePath = state.diffSrc;

  return compareImages(targetFilePath, baseFilePath, diffFilePath).then(diff => Object.assign({}, state, { diff }));
}

/*
const opts = {
  regressionPath: '__regression__',
  targetFolder: 'target',
  baseFolder: 'base',
  diffFolder: 'diff',
  tmpPath: 'tmp/visual-regression',
}
*/
function generateRegression(opts = {}) {
  const regressionFolderPath = getRegressionFolderPath(opts);
  const targetFolderPath = getTargetFolderPath(opts);
  const baseFolderPath = getBaseFolderPath(opts);
  const diffFolderPath = getDiffFolderPath(opts);

  const tmpFolderPath = getTmpFolderPath(opts);
  const tmpTargetFolderPath = getTmpTargetFolderPath(opts);
  const tmpBaseFolderPath = getTmpBaseFolderPath(opts);

  // setup
  ensureDirSync(baseFolderPath);
  ensureDirSync(targetFolderPath);
  ensureDirSync(diffFolderPath);
  ensureDirSync(tmpFolderPath);
  ensureDirSync(tmpTargetFolderPath);
  ensureDirSync(tmpBaseFolderPath);

  // read files in target and base dirs
  const targetFiles = fs.readdirSync(targetFolderPath);
  const baseFiles = fs.readdirSync(baseFolderPath);

  const targetFilesNotMatched = targetFiles.filter(file => baseFiles.indexOf(file) === -1).map(filename => {
    const src = path.resolve(targetFolderPath, filename);
    const relSrc = src.replace(regressionFolderPath, '.');
    return { filename, src, relSrc };
  });

  const baseFilesNotMatched = baseFiles.filter(file => targetFiles.indexOf(file) === -1).map(filename => {
    const src = path.resolve(baseFolderPath, filename);
    const relSrc = src.replace(regressionFolderPath, '.');
    return { filename, src, relSrc };
  });

  const regressionFiles = targetFiles.filter(file => baseFiles.indexOf(file) !== -1).map(filename => {
    const targetSrc = path.resolve(targetFolderPath, filename);
    const baseSrc = path.resolve(baseFolderPath, filename);
    const diffSrc = path.resolve(diffFolderPath, filename);
    const relTargetSrc = targetSrc.replace(regressionFolderPath, '.');
    const relBaseSrc = baseSrc.replace(regressionFolderPath, '.');
    const relDiffSrc = diffSrc.replace(regressionFolderPath, '.');
    return { filename, targetSrc, baseSrc, diffSrc, relTargetSrc, relBaseSrc, relDiffSrc };
  });

  const promises = regressionFiles.map(obj =>
    getSizesInfo(obj)
      .then(result => createTemporaryImages(result, tmpTargetFolderPath, tmpBaseFolderPath))
      .then(result => imageRegression(result))
  );

  return Promise.all(promises).then(regressionFilesMatched => ({
    regressionFolderPath,
    targetFilesNotMatched,
    baseFilesNotMatched,
    regressionFilesMatched,
  }));
}

/*
const opts = {
  regressionPath: '__regression__',
  resultsFile: '__regression__/results.json',
  targetFolder: 'target',
  baseFolder: 'base',
  diffFolder: 'diff',
  tmpPath: 'tmp/visual-regression',
}
*/
function writeRegressionToFile(opts = {}) {
  const resultsFilePath = getResultsFilePath(opts);
  const resultFolderPath = path.dirname(resultsFilePath);
  ensureDirSync(resultFolderPath);
  return generateRegression(opts).then(results => fs.writeFileSync(resultsFilePath, JSON.stringify(results)));
}

module.exports = {
  generateRegression,
  writeRegressionToFile,
};
