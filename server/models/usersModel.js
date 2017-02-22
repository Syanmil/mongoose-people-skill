var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var skillsSchema = new Schema({
  skill: String,
  score: Number
})

var usersSchema = new Schema({	'username' : String,	'skills' : [skillsSchema]});

module.exports = mongoose.model('users', usersSchema);
