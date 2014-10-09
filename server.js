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
var sio = require('socket.io').listen(server);
var socketio_jwt = require('socketio-jwt');
var secret = 'foo bar big secret';

////With socket.io >= 1.0
sio.use(socketio_jwt.authorize({
  secret: secret,
  handshake: true
}));
var clients = {};
sio.sockets
  .on('connection', function (socket) {
      var username = socket.decoded_token.username;
    console.log(username, 'connected');
      clients[username] = socket;
    socket.on('ping', function (m) {
      socket.emit('pong', m);
    });
  });

setInterval(function () {
  sio.sockets.emit('time', Date());
}, 2000);
