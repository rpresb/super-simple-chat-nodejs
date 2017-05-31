'use strict';

// define globals
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server),
    path = require('path'),
    bodyParser = require('body-parser');

// set up our chat server
require('./sockets/chat')(io);

server.listen(process.env.CHAT_PORT || 5000);

app.set('view engine', 'jade');

// middleware settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// for dev
app.use(express.static(__dirname + '/frontend/app/'));

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;