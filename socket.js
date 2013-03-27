var io  = require('socket.io').listen(3210);

io.set('log level', 1);

var latest_time = 0;

io.sockets.on('connection', function(socket) {
    console.log("socket started");

    socket.on('check:time', function (data) {
        latest_time = latest_time > data ? latest_time : data;
        console.log(latest_time);
        io.sockets.emit('update:time', latest_time);
    });

});