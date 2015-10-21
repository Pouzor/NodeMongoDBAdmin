'use strict';

/* jshint -W098 */
angular.module('mean.nodemongodbadmin').controller('NodemongodbadminController', ['$scope', 'Global', 'Database',
    function ($scope, Global, Database) {
        $scope.global = Global;
        $scope.package = {
            name: 'nodemongodbadmin'
        };

        Database.query(function (databases) {
            $scope.databases = databases;
        });


    }
]);
