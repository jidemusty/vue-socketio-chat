var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var user = Date.now();

    socket.on('message.sent', function (message) {
        io.emit('message', user + ': ' + message);
    });

    io.emit('message', 'User ' + user + ' connected');
})

http.listen(3000, () => {
    console.log('Server Running');
});