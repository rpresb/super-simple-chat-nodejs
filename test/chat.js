var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:5000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe("Chat Server", function () {
  it('Should broadcast new user to all users');
  it('Should broadcast messages');
});