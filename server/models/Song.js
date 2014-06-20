require('simpleplan')();

module.exports = function(Mongoose) {
  var songSchema = new Mongoose.Schema({
    participants: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  Mongoose.model('Song', songSchema);
}.inject();
