var Chat = function (io) {
    'use strict';

    var chat = {
        users: []
    };

    io.on('connection', function (socket) {
        socket.broadcast.emit('user connected');

        socket.on('new-user', function (userName) {
            chat.users.push(userName);

            io.sockets.emit('broadcast-new-user', {
                payload: `${userName} is online`,
                source: userName
            });
        });

        socket.on('message', function (from, msg) {
            console.log('recieved message from', from, 'msg', JSON.stringify(msg));
            console.log('broadcasting message');
            console.log('payload is', msg);
            io.sockets.emit('broadcast', {
                payload: msg,
                source: from
            });
            console.log('broadcast complete');
        });
    });

    return (chat);
};

module.exports = Chat;