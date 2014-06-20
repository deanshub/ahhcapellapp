require('simpleplan')();

module.exports = function(Mongoose) {
  var userSchema = new Mongoose.Schema({
    facebookId: String,
    displayName: String
  });
  Mongoose.model('User', userSchema);
}.inject();
