'use strict';

/* jshint -W098 */
angular.module('mean.nodemongodbadmin').controller('NodemongodbadminController', ['$scope', 'Global', 'Database',
    function ($scope, Database) {

        Database.query(function (databases) {
            $scope.databases = databases;
        });


    }
]);

angular.module('mean.nodemongodbadmin').controller('DatabaseCtrl', ['$scope','$stateParams', 'Database',
    function ($scope, $stateParams, Database) {

        Database.query(function (databases) {
            $scope.databases = databases;
        });

        $scope.databaseSelected = $stateParams.name;
        $scope.collections = Database.get({id: $scope.databaseSelected});

    }
]);

