import express from 'express';
import path from 'path';

import { appUrl, appVersion } from './environment.mjs';

const dirname = path.dirname(import.meta.url).substr(7);
const appDistPath = path.join(dirname, '../dist');

const app = express();
app.set('view engine', 'ejs');

app.get('/status', (req, res) => res.send('OK'));
app.use('/static', express.static(appDistPath));

app.get('/adviser', (req, res) => res.render('index', { bundleName: `${appUrl}/static/adviser.js?v=${appVersion}` }));
app.get('/investor', (req, res) => res.render('index', { bundleName: `${appUrl}/static/investor.js?v=${appVersion}` }));
app.get('*', (req, res) => res.redirect('/investor'));

const server = app.listen(3000, () => {
  console.log('server started');
  // console.log(server);
});
