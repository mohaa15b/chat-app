const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

let useron = 0;

io.on('connection', (socket) => {
  console.log('A user connected');

socket.on('disconnect', (socket) => {
  console.log('A user disconnected');
  useron--;
  io.emit("user left3", useron);
});

  socket.on("user joined1", function () {
    useron++;
    io.emit("user joined2", useron);
}  )
  socket.on("user left1", function () {
    useron--;
    io.emit("user left2", useron);
  })

  socket.on("chatmsg1", function (msg) {
    io.emit("chatmsg2", msg);
    console.log(msg)
  })
});



server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});