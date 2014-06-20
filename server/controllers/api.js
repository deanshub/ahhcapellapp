require('simpleplan')();

module.exports = function(app, baucis) {
  baucis.rest('Song');
  app.use('/api', baucis());
}.inject();
