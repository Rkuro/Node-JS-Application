/*
Robin Kurosawa
Simple Node.js server
Uses HTTPS (TLS v1.2)
and Sockets.io (v4.3.0)
*/

// import modules
const fs = require('fs');
const https = require('https');

// grab crypto keys
const options = {
  pfx: fs.readFileSync('server.pfx')
};

// specify the port
var serverPort = 443

// create https server
var server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world!\n');
});
// pull in the socket.io module with https
var io = require('socket.io')(server);

// handle asynchronous socket connections
io.on('connection', function(socket) {
  console.log('new connection');
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  socket.emit('message', 'This is a message from the dark side.');

});

// run the server
server.listen(serverPort,function() {

  console.log("Server up and running at %s port", serverPort);
});
