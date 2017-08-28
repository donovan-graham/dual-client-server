'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>React App Setup</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
<img src="http://somesite.com/boom.jpg" width=100 height=100/>
<div id="root">
  </div>
</html>`;

const keys = ['iPhone 5', 'iPhone 6 Plus', 'Galaxy S III', 'Galaxy S5', 'iPad', 'iPad landscape'];

const dimensions = async page => {
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });
  console.log('Dimensions:', dimensions);
  return page;
};

const capture = async page => {
  const originalViewport = page.viewport();
  await page.screenshot({ path: 'news_desktop.png', fullPage: true });
  await dimensions(page);

  for (let key of keys) {
    await page.setViewport(Object.assign({}, devices[key].viewport, { isMobile: false, hasTouch: false }));
    await dimensions(page);
    await page.screenshot({ path: `news_${key.toLowerCase().replace(/ /g, '_')}.png`, fullPage: true });
  }
  await page.setViewport(originalViewport);
  return page;
};

const test = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setRequestInterceptionEnabled(true);
  page.on('request', request => {
    if (/boom.jpg$/i.test(request.url)) {
      request.continue({ url: 'file:///data/headless.jpg' });
    } else if (/\.(js|css|png|jpg|jpeg|gif|webp)$/i.test(request.url)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  // await page.goto('https://bbc.com');
  await page.setContent(html);
  await page.injectFile('./dist/client/static/js/index.bundle.js');

  // await page.screenshot({ path: 'news_desktop.png', fullPage: true });
  await capture(page);
  browser.close();
};

test();
