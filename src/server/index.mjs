import express from 'express';
import path from 'path';

const __dirname = path.dirname(import.meta.url).substr(7);
console.log(__dirname);

const clientDistPath = path.join(__dirname, '../../dist/client');
const viewsDirectoryPath = path.join(__dirname, '/views');

const appUrl = 'http://localhost:3000';
const appVersion = process.env.NODE_ENV === 'production' ? 'v10.0.2' : 'devbuild';

const app = express();
app.set('view engine', 'ejs');
app.set('views', viewsDirectoryPath);

app.use('/static', express.static(clientDistPath));

app.get('/adviser', (req, res) => res.render('index', { bundleName: `${appUrl}/static/adviser.js?v=${appVersion}` }));
app.get('/investor', (req, res) => res.render('index', { bundleName: `${appUrl}/static/investor.js?v=${appVersion}` }));
app.get('*', (req, res) => res.redirect('/investor'));

const server = app.listen(3000, () => {
  console.log('server started');
  // console.log(server);
});
