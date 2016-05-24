var db = require('./dbConfig.js');
var mongoose = require('mongoose');

var data = require('../client/data.js');

var wodSchema = mongoose.Schema({
  type: String,
  name: String,
  description: String
});

var Wod = mongoose.model('Wod', wodSchema);

// uncomment once to add the wods data to mongo

// data.wods.forEach(function(wod) {
//   var newWods = new Wod({
//     type: wod.type,
//     name: wod.name,
//     description: wod.description
//   }).save(function(err) {
//     if (err) {
//       console.log('error');
//     } else {
//       console.log('wod saved');
//     }
//   });
// });


module.exports = Wod;