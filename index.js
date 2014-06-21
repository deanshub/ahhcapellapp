var deps = {};
var express          = deps.express          = require('express');
var passport         = deps.passport         = require('passport');
var FacebookStrategy = deps.FacebookStrategy = require('passport-facebook').Strategy;
var app              = deps.app              = express();
var Mongoose         = deps.Mongoose         = require('mongoose');
var bodyParser       = deps.bodyParser       = require('body-parser');
var cookieParser     = deps.cookieParser     = require('cookie-parser');
var session          = deps.session          = require('express-session');
var baucis           = deps.baucis           = require('baucis');
Mongoose.connect('mongodb://localhost/haloaa_test');


require('./models/User')(deps);
require('./models/Song')(deps);

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({ secret: 'haminados' }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(deps);
require('./controllers/api')(deps);

app.get('/', function(req, res) {
  res.status(200).send("hai");
});

app.get('/login', function(req, res) {
  res.send("You must <a href='/auth/facebook'>Login via Facebook</a>");
});

app.post('/upload', function(req, res) {
  if (!req.isAuthenticated()) { return next('not authenticated!') };

  var song = new Mongoose.models.Song({
    participants: [req.user._id],
    data: req.body.data
  });

  song.save(function() {
    res.send('wat');
  });
});

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
app.listen(port, host);
console.log("Express running on " + host + ":" + port);
