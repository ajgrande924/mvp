var path = require('path');  
var express = require('express');  
var webpack = require('webpack');  
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');  
var config = require('./webpack.config.js');

var app = express();  
var compiler = webpack(config);

app.use(express.static(__dirname + '/client'));  
app.use(webpackMiddleware(compiler));  
app.get('*', function response(req, res) {  
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(3000, function() {
	console.log('Listening on Port ', 3000);
}); 