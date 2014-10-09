'use strict';

var socketio_jwt = require('socketio-jwt');
var socket_io = require('socket.io');
var clients = {};
var secret = 'foo bar big secret';

function init(server) {
    var sio = socket_io.listen(server);
    console.log('socket.io open...');
    
    sio.use(socketio_jwt.authorize({
      secret: secret,
      handshake: true
    }));

    sio.sockets
      .on('connection', function (socket) {
          var username = socket.decoded_token.username;
        console.log(username, 'connected');
          clients[username] = socket;
        socket.on('ping', function (m) {
          socket.emit('pong', m);
        });
      });

//    setInterval(function () {
//      sio.sockets.emit('time', Date());
//    }, 2000);
};

module.exports = {
    init: init,
    clients: clients    
}