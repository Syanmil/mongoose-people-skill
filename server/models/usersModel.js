var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var skillsSchema = new Schema({
  skill: String,
  score: Number
})

var usersSchema = new Schema({

module.exports = mongoose.model('users', usersSchema);