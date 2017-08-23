import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from '../client/app.js';

const server = express();

const clientDistPath = path.join(__dirname, '../dist/client');
const clientDistStaticPath = path.join(clientDistPath, 'static');

server.use('/static', express.static(clientDistPath));

server.use('/ssr', (req, res) => {
  const html = renderToStaticMarkup(<App />);
  res.send(html);
});

server.get('/', (req, res) => {
  const html = fs.readFileSync(path.join(clientDistPath, 'index.html'), 'utf-8');
  const mod = html.replace('</head>', '<meta name="boom" value="boomboom" /></head>');
  res.send(mod);
});

server.listen(3000);
