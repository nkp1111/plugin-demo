const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');


const ejs = require('ejs');

const users = {
  user1: {
    plugins: {
      googleAnalytics: { installed: true, key: process.env.GOOGLE_ANALYTIC_ID1 },
    }
  },
  user2: {
    plugins: {
      googleAnalytics: { installed: true, key: process.env.GOOGLE_ANALYTIC_ID2 },
    }
  },
  user3: {
    plugins: {
      googleAnalytics: { installed: true, key: process.env.GOOGLE_ANALYTIC_ID3 },
    }
  },
}

const port = 3000;
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cors('*'));

app.get('/api/:user', async (req, res) => {
  const { user } = req.params;
  const pluginData = users[user].plugins;

  const data = await ejs.renderFile('./views/index.ejs', { plugins: pluginData, user, serverUrl });
  // res.send(data);

  res.json({ plugins: pluginData, data });
})

app.post('/api/:user/install', (req, res) => {
  const { plugin } = req.query;
  const { user } = req.params;
  users[user].plugins[plugin].installed = true;
  res.redirect('/api/' + user);
})

app.post('/api/:user/uninstall', (req, res) => {
  const { plugin } = req.query;
  const { user } = req.params;
  console.log(plugin, user)
  users[user].plugins[plugin].installed = false;
  res.redirect('/api/' + user);
})

app.get("/api/:user/addApi", (req, res) => {
  const { plugin, apiKey } = req.query;
  const { user } = req.params;
  users[user].plugins[plugin].key = apiKey;
  res.redirect('/api/' + user);
})

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})