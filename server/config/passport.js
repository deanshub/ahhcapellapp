require('simpleplan')();

module.exports = function(app, passport, FacebookStrategy, Mongoose) {
  passport.use(new FacebookStrategy({
      clientID: process.env.HALOAA_FACEBOOK_APP_ID,
      clientSecret: process.env.HALOAA_FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      Mongoose.models.User.findOne({
        facebookId: profile.id
      }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
          done(null, user);
        } else {
          new Mongoose.models.User({
            facebookId: profile.id,
            displayName: profile.displayName
          }).save(function(err, user) {
            if (err) { return done(err); }
            done(null, user);
          });
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Mongoose.models.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
}.inject();
