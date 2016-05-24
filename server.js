var path = require('path');  
var express = require('express');  
var webpack = require('webpack');  
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');  
var config = require('./webpack.config.js');
var bodyParser = require('body-parser')

var mongoose = require('mongoose');
var db = require('./db/dbConfig.js');
var User = require('./db/userModel.js');
var Wod = require('./db/wodModel.js');
var Result = require('./db/resultModel.js');


var app = express();  
var compiler = webpack(config);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));  
app.use(webpackMiddleware(compiler));  

// app.get('*', function response(req, res) {  
//   res.sendFile(path.join(__dirname, '/client/index.html'));
// });

app.get('/users', function(req, res) {
	console.log('query string', req.query);
	User.find({}).exec(function(err, users) {
		if (err) {
			console.log('error in fetching users');
		} else {
			console.log('users', users);
			res.status(200).send(users);
		}
	})
})

app.get('/results', function(req, res) {
	console.log('query string', req.query);
	Result.find({}).exec(function(err, results) {
		if (err) {
			console.log('error in fetching results');
		} else {
			console.log('results', results);
			res.status(200).send(results);
		}
	})
})

app.get('/wods', function(req, res) {
	console.log('query string', req.query);
	Wod.find({}).exec(function(err, wods) {
		if (err) {
			console.log('error in fetching wods');
		} else {
			console.log('wods', wods);
			res.status(200).send(wods);
		}
	})
})

app.post('/results', function(req, res) {
	console.log('req.body', req.body);
	var newResults = new Result({
		name: req.body.name,
	    wod: req.body.wod,
	    time: req.body.time,
	    rounds: req.body.rounds,
	    partial: req.body.partial,
	    date: req.body.date,
	    url: req.body.url
	}).save(function(err) {
		if (err) {
			console.log('error');
		} else {
			console.log('saved');
			// res.status(200).send('hello');
		}
	});
})

app.listen(3000, function() {
	console.log('Listening on Port ', 3000);
}); 