'use strict';
angular.module('chatApp')
  .factory('chatSocket', function (socketFactory, socketaddr) {
    var socket = socketFactory({
      ioSocket: io.connect(socketaddr)
    });

    socket.forward('broadcast');
    return socket;
  });
