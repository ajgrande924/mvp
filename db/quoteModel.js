var db = require('./dbConfig.js')
var mongoose = require('mongoose');

var data = require('../client/data.js');

var quoteSchema = mongoose.Schema({
  quote: String,
  author: String
});

var Quote = mongoose.model('Quote', quoteSchema);

// uncomment once to add the quotes data to mongo

// data.quotes.forEach(function(quote) {
//   var newQuote = new Quote({
//     quote: quote.quote,
//     author: quote.author
//   }).save(function(err) {
//     if (err) {
//       console.log('error');
//     } else {
//       console.log('quote saved');
//     }
//   });
// });

module.exports = Quote;