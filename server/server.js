var express = require('express');
var path = require('path');
var router = require('router');
var bodyParser = require('body-parser');

var app = express();

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

app.get('/', function(req, res) {
  res.send('Hello RAD HACKS');
});
