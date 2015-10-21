'use strict';

/* jshint -W098 */
angular.module('mean.nodemongodbadmin').controller('NodemongodbadminController', ['$scope', 'Database',
    function ($scope, Database) {

        Database.query(function (databases) {
            $scope.databases = databases;
        });


    }
]);

angular.module('mean.nodemongodbadmin').controller('DatabaseCtrl', ['$scope','$stateParams', 'Database',
    function ($scope, $stateParams, Database) {

        $scope.databaseSelected = $stateParams.name;
        $scope.collections = Database.get({id: $scope.databaseSelected});
        $scope.request = '{}';
        $scope.type = "find";
        $scope.limit = 10;
        $scope.sort_key = "_id";
        $scope.sort_value = -1;
        $scope.collectionSelected = 'none';
        $scope.result = null;
        $scope.sending = '';
        $scope.error = false;
        $scope.info = false;

        Database.query(function (databases) {
            $scope.databases = databases;
        });

        $scope.selectCollection = function (name) {
            //  $scope.collection_selected = name.substring($scope.database_selected.length + 1);
            $scope.collectionSelected = name;
        }

    }
]);

