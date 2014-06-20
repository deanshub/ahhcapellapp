require('simpleplan')();

module.exports = function(app, baucis) {
  baucis.rest('Song').request(function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }

    return res.send(401);
  }).query(function(req, res, next) {
    req.baucis.query.where({ participants: req.user._id });
    next();
  });
  app.use('/api', baucis());
}.inject();
