'use strict';

/* jshint -W098 */
angular.module('mean.nodemongodbadmin').controller('NodemongodbadminController', ['$scope', 'Global', 'Nodemongodbadmin',
  function($scope, Global, Nodemongodbadmin) {
    $scope.global = Global;
    $scope.package = {
      name: 'nodemongodbadmin'
    };
  }
]);
