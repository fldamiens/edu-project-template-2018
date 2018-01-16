const express = require('express');
const api = require('./api_episodes.js');
const config = require('./config.js');
const app = express();

app.use('/api/episodes', api);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
