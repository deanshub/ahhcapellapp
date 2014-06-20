require('simpleplan')();

module.exports = function(Mongoose) {
  var userSchema = new Mongoose.Schema({
    name: String
  });
  Mongoose.model('User', userSchema);
}.inject();
