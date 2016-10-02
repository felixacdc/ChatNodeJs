var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('sendMessage', function (data) {
        io.sockets.emit("newMessage", {msg: data});
    });
});

server.listen(8080, function () {
    console.log('Servidor corriendo en el puerto 8080');
});