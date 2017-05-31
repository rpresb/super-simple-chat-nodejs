var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://localhost:5000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe("Chat Server", function () {
  it('Should broadcast new user to all users', function (done) {
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function (data) {
      client1.emit('new-user', 'User1');

      var client2 = io.connect(socketURL, options);
      client2.on('connect', function (data) {
        client2.emit('new-user', 'User2');
        client2.disconnect();
      });

      var numUsers = 0;
      client1.on('broadcast-new-user', function (msg) {
        numUsers++;

        if (numUsers === 2) {
          msg.source.should.equal('User2');
          msg.payload.should.equal('User2 is online');

          client1.disconnect();
          done();
        }
      });
    });
  });

  it('Should broadcast messages');
});