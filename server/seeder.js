var usersModel = require('./models/usersModel.js');
var mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)

let seedData = [
  {username: 'yoni', skills: []},
  {username: 'yona', skills: []},
  {username: 'yonu', skills: []},
  {username: 'yono', skills: []}
]
function seed(data) {
  usersModel.collection.insertMany(seedData, function(err, users){
    if(err){console.log(err);}
    console.log(users);
  })
}
// seed(seedData)
