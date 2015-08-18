process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var http = require('http');
var express = require('express');

var app = express();
require('./config/middleware.js')(app, express);

var server = require('http').createServer(app);

var port = process.env.PORT || 8000;

//Start the server
server.listen(port, function() {
	console.log('Server listening on port ' + port);
});

module.exports = app;