var db = require('./dbConfig.js');
var mongoose = require('mongoose');

var data = require('../client/data.js')

var userSchema = mongoose.Schema({
  name: String,
  sex: String,
  age: Number,
  url: String,
  affiliate: String
});

var User = mongoose.model('User', userSchema);

// uncomment once to add the user data to mongo

// data.users.forEach(function(user) {
//   var newUser = new User({
//     name: user.name,
//     sex: user.sex,
//     age: user.age,
//     url: user.url
//   }).save(function(err) {
//     if (err) {
//       console.log('error');
//     } else {
//       console.log('user saved');
//     }
//   });
// });

module.exports = User;