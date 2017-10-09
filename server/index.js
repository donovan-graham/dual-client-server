import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
// import StyleSheet from 'styled-components/lib/models/StyleSheet';
import App from '../client/app.js';

// StyleSheet.reset(true); // reset to use server stylesheet

const server = express();

const clientDistPath = path.join(__dirname, '../dist/client');
const clientDistStaticPath = path.join(clientDistPath, 'static');

server.use('/static', express.static(clientDistPath));

server.use('/ssr', (req, res) => {
  const sheet = new ServerStyleSheet();
  const app = renderToStaticMarkup(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleTags();

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>React App Setup</title>
  <meta name="viewport" content="width=device-width">
  ${styleTags}
</head>
<body>
  <div id="root">${app}
  </div>
</body>
</html>`;

  //const html = renderToStaticMarkup(<App />);
  res.send(html);
});

server.get('/', (req, res) => {
  const html = fs.readFileSync(path.join(clientDistPath, 'index.html'), 'utf-8');
  const mod = html.replace('</head>', '<meta name="boom" value="boomboom" /></head>');
  res.send(mod);
});

server.listen(3000);
