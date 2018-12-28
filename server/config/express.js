const path = require('path');
const express = require('express');
const httpError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../routes/index.route');

const app = express();

var distDir = '../../dist/testapp';

app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

console.log(distDir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404);
  return next(err);
});

module.exports = app;
