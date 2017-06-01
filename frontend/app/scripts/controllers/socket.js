'use strict';

angular.module('chatApp')
  .controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter) {
    $scope.nickName = null;
    $scope.messageLog = '';
    $scope.connected = false;
    $scope.errorMessage = null;

    $scope.connect = function () {
      if (!$scope.nickName) {
        $scope.errorMessage = 'Your nickname is required';
        return;
      }

      $scope.errorMessage = null;
      chatSocket.emit('new-user', $scope.nickName);
      $scope.connected = true;
    };

    $scope.sendMessage = function () {
      chatSocket.emit('message', $scope.nickName, $scope.message);
      $scope.message = '';
    };

    $scope.$on('socket:broadcast', function (event, data) {
      if (!data.payload) {
        $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
        return;
      }
      $scope.$apply(function () {
        $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
      });
    });

  });
