'use strict';

angular.module('mean.nodemongodbadmin').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('nodemongodbadmin example page', {
      url: '/nodemongodbadmin/example',
      templateUrl: 'nodemongodbadmin/views/index.html'
    });
  }
]);
