var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
app.get('/', function(req, res) {
  res.send('hai');
});

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
app.listen(port, host);
console.log("Express running on " + host + ":" + port);
