const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  // cors: {
  //   origin: '*',
  // },
});

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log('A user connected');
  socket.broadcast.emit('hi');
  console.log(socket.id);

  socket.on('chat message to server', ({ id, msg }) => {
    io.emit('chat message to client', { id, msg });
  });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
