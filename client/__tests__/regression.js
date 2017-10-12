/**
 * @jest-environment node
 */

import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import Page from 'puppeteer/lib/Page';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import gm from 'gm';

const imageMagick = gm.subClass({ imageMagick: true });

import App from '../app';
import Button from '../restyled/button';
import Chart from '../restyled/performance';

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
        file: diffOuputPath
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
        but got ${sizes.actual.width}px X ${sizes.actual.height}px.`
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
      message: `${goldenName} file not found in "${goldenPath}". ${messageSuffix}`
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
    message: `${message} ${messageSuffix}`
  };
}

expect.extend({
  isGolden(compared) {
    return compared;
    // return Object.assign({}, compared, { pass: false, message: 'you betcha' });
  },

  toBeGolden: async (actual, goldenName) => {
    return await compare(actual, goldenName);
  }
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

function createHtml(Component, innerText = null) {
  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<Component>{innerText}</Component>));
  const styleTags = sheet.getStyleTags();

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">${styleTags}</head><body><div id="root">${body}</div></body></html>`;
}

describe('home page', () => {
  let browser;
  let page;

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

    return page;
  });

  afterEach(async () => {
    return await browser.close();
  });

  const keys = ['iPhone 5', 'iPhone 6 Plus', 'Galaxy S III', 'Galaxy S5', 'iPad', 'iPad landscape'];

  for (let key of keys) {
    test(`capture ${key}`, async () => {
      await page.setContent(createHtml(App));
      await page.setViewport(Object.assign({}, devices[key].viewport, { isMobile: false, hasTouch: false }));
      const screenshot = await page.screenshot({ fullPage: true });
      const filename = `home_${key.toLowerCase().replace(/ /g, '_')}.png`;
      const result = await compare(screenshot, filename);
      expect(result).isGolden();
    });
  }

  test(`button test `, async () => {
    await page.setContent(createHtml(Button, 'Click Me'));
    const screenshot = await page.screenshot({ fullPage: true, omitBackground: false });
    const filename = `simple_button.png`;
    const result = await compare(screenshot, filename);
    expect(result).isGolden();
  });

  test(`button hover test `, async () => {
    await page.setContent(createHtml(Button, 'Click Me'));
    const buttonElement = await page.$('button');
    await buttonElement.hover();
    const screenshot = await page.screenshot({ fullPage: true, omitBackground: false });
    const filename = `simple_button_hover.png`;
    const result = await compare(screenshot, filename);
    expect(result).isGolden();
  });

  test.only(`performance chart test `, async () => {
    await page.setContent(createHtml(Chart));
    // const clip = {
    //   x: 0,
    //   y: 0,
    //   width: 910,
    //   height: 270
    // };

    // const screenshot = await page.screenshot({ omitBackground: false, clip });
    const screenshot = await page.screenshot({ fullPage: true, omitBackground: false });
    const filename = `performance_chart_full.png`;
    const result = await compare(screenshot, filename);
    expect(result).isGolden();
  });
});
