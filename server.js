var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

var server = app.listen(config.port);
console.log("NODE_ENV = " + env);
console.log("Server running on port: " + config.port);

// Websocket
var socketIo = require('socket.io');
var socketio_jwt = require('socketio-jwt');
var jwt = require('jsonwebtoken');
var jwt_secret = 'foo bar big secret';
var sio = socketIo.listen(server);

// With socket.io >= 1.0
//sio.use(socketio_jwt.authorize({
//  secret: jwt_secret,
//  handshake: true
//}));

sio.sockets
  .on('connection', function (socket) {
    //console.log(socket.decoded_token.username, 'connected');
      console.log('connected');
    socket.on('ping', function (m) {
      socket.emit('pong', m);
    });
  });

setInterval(function () {
  sio.sockets.emit('time', Date());
}, 2000);
