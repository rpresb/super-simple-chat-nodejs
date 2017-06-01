var Chat = function (io) {
    'use strict';

    var chat = {
        users: []
    };

    var newUser = function (userName) {
        var socketId = this.id;

        chat.users.push({
            socketId: socketId,
            userName: userName
        });

        // Broadcast new user
        io.sockets.emit('broadcast', {
            payload: `${userName} is online`,
            source: userName
        });
    };

    var sendMessage = function (from, msg) {
        //Broadcast message to all users
        io.sockets.emit('broadcast', {
            payload: msg,
            source: from
        });
    };

    var disconnect = function () {
        // find user that is leaving the chat
        var user = chat.users.find((u) => u.socketId === this.id);
        if (user) {
            // remove the user from the array
            chat.users = chat.users.filter((u) => u.socketId !== user.socketId);
            
            io.sockets.emit('broadcast', {
                payload: `${user.userName} has left`,
                source: user.userName
            });
        }
    };

    var connected = function (socket) {
        // listen socket events
        socket.on('new-user', newUser);
        socket.on('message', sendMessage);
        socket.on('disconnect', disconnect);
    };

    // listen events
    io.on('connection', connected);

    return (chat);
};

module.exports = Chat;