const express = require("express");
const ejs = require("ejs");
const socket = require("socket.io");
const app = express();



app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/index.html")
})


const server = app.listen(3000, function() {
	console.log("server started at http://localhost:3000")
});

const io = socket(server);
io.on("connection", function(socket) {
	console.log("socket made connection  " + socket.id);
	socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});


io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will em



io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
