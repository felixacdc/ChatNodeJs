var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    usernames = {};

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('sendMessage', function (data) {
        io.sockets.emit("newMessage", {msg: data, user: socket.usernames});
    });
    
    socket.on('newUser', function(data, callback) {
        if( data in usernames ) 
            callback(false);
        else {
            callback(true);
            socket.usernames = data;
            usernames[socket.usernames] = 1;
            updateUsernames();
        }
    });
    
    socket.on("disconnect", function (data) {
        if(!socket.usernames) return;
        delete usernames[socket.usernames];
        updateUsernames();
    });
    
    function updateUsernames () {
        io.sockets.emit('usernames', usernames);
    }
});

server.listen(8080, function () {
    console.log('Servidor corriendo en el puerto 8080');
});