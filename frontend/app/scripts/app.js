'use strict';

var chatApp = angular.module('chatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io'
]);

chatApp.value('socketaddr', 'http://localhost:5000');
