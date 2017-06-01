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
      client1.on('broadcast', function (msg) {
        numUsers++;

        if (numUsers === 2) {
          'User2'.should.equal(msg.source);
          'User2 is online'.should.equal(msg.payload);

          client1.disconnect();
          done();
        }
      });
    });
  });

  it('Should broadcast messages', function (done) {
    var client1, client2, client3;
    var message = 'Hello World';
    var messages = 0;

    var checkMessage = function (client) {
      client.on('broadcast', function (msg) {
        message.should.equal(msg.payload);
        client.disconnect();
        messages++;
        if (messages === 3) {
          done();
        };
      });
    };

    client1 = io.connect(socketURL, options);
    checkMessage(client1);

    client1.on('connect', function (data) {
      client2 = io.connect(socketURL, options);
      checkMessage(client2);

      client2.on('connect', function (data) {
        client3 = io.connect(socketURL, options);
        checkMessage(client3);

        client3.on('connect', function (data) {
          client2.emit('message', 'User3', message);
        });
      });
    });
  });

  it('Should broadcast when user leaves the chat', function (done) {
    var client1, client2;
    var user1Name = 'User1 Disconnect';
    var user2Name = 'User2 Disconnect';
    var user2LeftMessage = 'User2 Disconnect has left';

    client1 = io.connect(socketURL, options);
    client1.on('connect', function () {
      client1.emit('new-user', user1Name);
      client1.on('broadcast', function (msg) {
        if (msg.source === user2Name && msg.payload === user2LeftMessage) {
          client1.disconnect();
          done();
        }
      });

      client2 = io.connect(socketURL, options);
      client2.on('connect', function () {
        client2.emit('new-user', user2Name);
        client2.disconnect();
      });
    });

  });
});