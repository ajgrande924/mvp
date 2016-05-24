var db = require('./dbConfig.js')
var mongoose = require('mongoose');

var data = require('../client/data.js');

var resultSchema = mongoose.Schema({
  name: String,
  wod: String,
  time: Number,
  rounds: Number,
  partial: Number,
  date: String,
  url: String
});

var Result = mongoose.model('Result', resultSchema);

// uncomment once to add the results data to mongo

// data.results.forEach(function(result) {
//   var newResult = new Result({
//     name: result.name,
//     wod: result.wod,
//     time: result.time,
//     rounds: result.rounds,
//     partial: result.partial,
//     date: result.date,
//     url: result.url
//   }).save(function(err) {
//     if (err) {
//       console.log('error');
//     } else {
//       console.log('result saved');
//     }
//   });
// });

module.exports = Result;