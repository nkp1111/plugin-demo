const express = require('express');
const app = express();
require('dotenv').config();

const ejs = require('ejs');

const plugins = {
  googleAnalytics: { installed: true, key: { measurementId: process.env.ANALYTIC_ID } },
}

port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const data = await ejs.renderFile('./views/index.ejs', { plugins });
  // console.log(data) 
  res.render('index.ejs', { plugins });
})

app.get('/install', (req, res) => {
  const { plugin } = req.query;
  plugins[plugin].installed = true;
  res.redirect('/');
})

app.get('/uninstall', (req, res) => {
  const { plugin } = req.query;
  plugins[plugin].installed = false;
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})