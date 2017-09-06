'use strict';

import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import Page from 'puppeteer/lib/Page';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import gm from 'gm';

const imageMagick = gm.subClass({ imageMagick: true });

import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

import App from '../app';

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>React App Setup</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
<img src="http://fake.test.com/boom.png" width=100 height=50/>
<div id="root">
  </div>
</html>`;

// async focus(selector) {
//   const handle = await this.$(selector);
//   console.assert(handle, 'No node found for selector: ' + selector);
//   await handle.evaluate(element => element.focus());
//   await handle.dispose();
// }

function getImageSize(imageBuffer) {
  return new Promise(resolve => imageMagick(imageBuffer).size((err, size) => resolve(size)));
}

function getImageDiff(actualBuffer, expectedBuffer, diffOuputPath) {
  return new Promise(resolve =>
    imageMagick().compare(actualBuffer, expectedBuffer, { file: diffOuputPath }, (err, isEqual, equality, raw) =>
      resolve({
        error: err,
        noise: equality,
        match: equality === undefined ? 0 : (1 - equality) * 100,
        raw,
        file: diffOuputPath,
      })
    )
  );
}

async function getSizesInfo(actualBuffer, expectedBuffer) {
  const [actual, expected] = await Promise.all([getImageSize(actualBuffer), getImageSize(expectedBuffer)]);
  return { actual, expected };
}

async function compareImages(actualBuffer, expectedBuffer, diffOuputPath) {
  const sizes = await getSizesInfo(actualBuffer, expectedBuffer);

  if (sizes.expected.width !== sizes.actual.width || sizes.expected.height !== sizes.actual.height) {
    return {
      errorMessage: `Sizes differ:
        expected image ${sizes.expected.width}px X ${sizes.expected.height}px,
        but got ${sizes.actual.width}px X ${sizes.actual.height}px.`,
    };
  }

  return await getImageDiff(actualBuffer, expectedBuffer, diffOuputPath);
}

function addSuffix(filePath, suffix, customExtension) {
  const dirname = path.dirname(filePath);
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  return path.join(dirname, name + suffix + (customExtension || ext));
}

async function compare(actualBuffer, goldenName) {
  const goldenPath = path.join(__dirname, '__images__/golden');
  const outputPath = path.join(__dirname, '__images__/output');

  const expectedGoldenPath = path.join(goldenPath, goldenName);

  const expectedOutputPath = path.join(outputPath, addSuffix(goldenName, '-0-expected'));
  const actualOutputPath = path.join(outputPath, addSuffix(goldenName, '-1-actual'));
  const diffOuputPath = path.join(outputPath, addSuffix(goldenName, '-2-diff'));

  const messageSuffix = `Output saved in "${outputPath}".`;
  fse.outputFileSync(actualOutputPath, actualBuffer);

  if (!fs.existsSync(expectedGoldenPath)) {
    return {
      pass: false,
      message: `${goldenName} file not found in "${goldenPath}". ${messageSuffix}`,
    };
  }
  fse.copySync(expectedGoldenPath, expectedOutputPath);
  const diff = await compareImages(actualOutputPath, expectedOutputPath, diffOuputPath);

  if (diff.match === 100) {
    fse.removeSync(expectedOutputPath);
    fse.removeSync(actualOutputPath);
    fse.removeSync(diffOuputPath);
    return { pass: true };
  }

  const message = diff.errorMessage ? `${goldenName} mismatch! ${diff.errorMessage}` : `${goldenName} mismatch!`;

  return {
    pass: false,
    message: `${message} ${messageSuffix}`,
  };
}

expect.extend({
  isGolden(compared) {
    return compared;
    // return Object.assign({}, compared, { pass: false, message: 'you betcha' });
  },

  toBeGolden: async (actual, goldenName) => {
    return await compare(actual, goldenName);
  },
});

Page.prototype.blur = async function(selector, value) {
  await this.evaluate(() => document.activeElement.blur);
};

Page.prototype.fillIn = async function(selector, value) {
  await this.focus(selector);
  await this.type(value);
  await this.blur();
};

Page.prototype.getText = async function(selector) {
  return await this.evaluate(sel => document.querySelector(sel).textContent, selector);
};

Page.prototype.getTextFor = async function(selector) {
  const el = await this.$(selector);
  return await el.evaluate(e => e.textContent);
};

Page.prototype.getTextForAll = async function(selector) {
  const els = await this.$$(selector);
  return await Promise.all(els.map(el => el.evaluate(e => e.textContent)));
};

// // Extract the results from the page
// const links = await page.evaluate(() => {
//   const anchors = Array.from(document.querySelectorAll('h3 a'));
//   return anchors.map(anchor => anchor.textContent);
// });

describe('home page', () => {
  let browser;
  let page;

  // async $(selector) {
  //   return this.mainFrame().$(selector);
  // }

  beforeEach(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    page = await browser.newPage();

    await page.setRequestInterceptionEnabled(true);
    page.on('request', request => {
      if (/api/i.test(request.url)) {
        request.continue({ url: 'file:///data/client/assets/headless.png' });
      } else if (/boom.png$/i.test(request.url)) {
        request.continue({ url: 'file:///data/client/assets/headless.png' });
      } else if (/\.(js|css|png|jpg|jpeg|gif|webp)$/i.test(request.url)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const html = ReactDOMServer.renderToStaticMarkup(<App />);

    await page.setContent(html);
    // await page.injectFile('./dist/client/static/js/index.bundle.js');

    return page;
  });

  afterEach(async () => {
    return await browser.close();
  });

  // test('t1', async () => {
  //   expect.assertions(2);
  //   const elements = await page.$$('h1');
  //   expect(elements.length).toBe(1);
  //   const x = await elements[0].evaluate(e => e.textContent);
  //   expect(x).toEqual('Hello World 123 !!');
  // });

  // test('t2', async () => {
  //   const x = await page.$('h1').then(y => y.evaluate(e => e.textContent));
  //   return expect(x).toEqual('Hello World 123 !!');
  // });

  // test('t3', async () => {
  //   const x = await page.$('h1').then(async y => await y.evaluate(e => e.textContent));
  //   return expect(x).toEqual('Hello World 123 !!');
  // });

  // test('t4', async () => {
  //   const el = await page.$('h1');
  //   const x = await el.evaluate(e => e.textContent);
  //   return expect(x).toEqual('Hello World 123 !!');
  // });

  // test('t5', async () => {
  //   expect.assertions(1);
  //   await page.waitFor('h1');
  //   const el = await page.$('h1');
  //   const x = await el.evaluate(e => e.textContent);
  //   expect(x).toEqual('Hello World 123 !!');
  // });

  test('getTextFor', async () => {
    await page.setContent(html);

    const h1 = await page.getTextFor('h1');
    return expect(h1).toEqual('Hello World 123 !!');
  });

  test('getTextForAll', async () => {
    const h1 = await page.getTextForAll('h1');
    return expect(h1).toEqual(['Hello World 123 !!']);
  });

  test('getText', async () => {
    const h1 = await page.getText('h1');
    return expect(h1).toEqual('Hello World 123 !!');
  });

  const keys = ['iPhone 5', 'iPhone 6 Plus', 'Galaxy S III', 'Galaxy S5', 'iPad', 'iPad landscape'];
  for (let key of keys) {
    test(`capture ${key}`, async () => {
      await page.setViewport(Object.assign({}, devices[key].viewport, { isMobile: false, hasTouch: false }));
      const screenshot = await page.screenshot({ fullPage: true });
      const filename = `home_${key.toLowerCase().replace(/ /g, '_')}.png`;
      const result = await compare(screenshot, filename);
      expect(result).isGolden();
    });
  }
});

// const capture = async page => {
//   const originalViewport = page.viewport();
//   await page.screenshot({ path: 'news_desktop.png', fullPage: true });
//   await dimensions(page);

//   for (let key of keys) {
//     await page.setViewport(Object.assign({}, devices[key].viewport, { isMobile: false, hasTouch: false }));
//     await dimensions(page);
//     await page.screenshot({ path: `news_${key.toLowerCase().replace(/ /g, '_')}.png`, fullPage: true });
//   }
//   await page.setViewport(originalViewport);
//   return page;
// };
