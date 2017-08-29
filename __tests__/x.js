'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const Page = require('puppeteer/lib/Page');

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

const sum = (a, b) => a + b;

// async focus(selector) {
//   const handle = await this.$(selector);
//   console.assert(handle, 'No node found for selector: ' + selector);
//   await handle.evaluate(element => element.focus());
//   await handle.dispose();
// }

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

describe('matching cities to foods', () => {
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
      if (/boom.png$/i.test(request.url)) {
        request.continue({ url: 'file:///data/headless.png' });
      } else if (/\.(js|css|png|jpg|jpeg|gif|webp)$/i.test(request.url)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.setContent(html);
    await page.injectFile('./dist/client/static/js/index.bundle.js');

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
});
