const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');


const ejs = require('ejs');

const plugins = {
  googleAnalytics: { installed: true, key: process.env.ANALYTIC_ID },
}

const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cors('*'));

app.get('/api', async (req, res) => {
  const data = await ejs.renderFile('./views/index.ejs', { plugins });
  // console.log(data) 
  // res.render('index.ejs', { plugins });
  res.json({ plugins });
})

app.get('/api/install', (req, res) => {
  const { plugin } = req.query;
  plugins[plugin].installed = true;
  res.redirect('/api');
})

app.get('/api/uninstall', (req, res) => {
  const { plugin } = req.query;
  plugins[plugin].installed = false;
  res.redirect('/api');
})

app.get("/api/addApi", (req, res) => {
  const { plugin, apiKey } = req.query;
  plugins[plugin].key = apiKey;
  res.redirect('/api');
})

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})