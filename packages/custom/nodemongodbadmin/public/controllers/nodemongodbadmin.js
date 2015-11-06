'use strict';

/* jshint -W098 */
angular.module('mean.nodemongodbadmin').controller('NodemongodbadminController', ['$scope', 'Database',
    function ($scope, Database) {

        Database.query(function (databases) {
            $scope.databases = databases;
        });


    }
]);

angular.module('mean.nodemongodbadmin').controller('DatabaseCtrl', ['$scope','$stateParams', 'Database', 'Request',
    function ($scope, $stateParams, Database, Request) {

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
        };

        $scope.submitRequest = function () {

            var request = $scope.request;
            $scope.result = null;
            $scope.sending = 'disabled';
            request = request.replace(/\$/g, "MONGO_OPERATOR");// Cause $ get disepear when stringify

            try {
                request = angular.fromJson(request);
            } catch (ex) {
                $scope.error = true;
                $scope.sending = '';

                return;
            }
            request = {
                request: request,
                database: $scope.databaseSelected,
                collection: $scope.collectionSelected,
                type: $scope.type,
                limit: parseInt($scope.limit),
                sort: [[$scope.sort_key, $scope.sort_value]]
            };

            Request.save(request, function (res, err) {

                if (err) {
                    console.log("Error : " + err);
                }
                console.log(res);
                $scope.error = false;
                $scope.result = res;
                $scope.sending = '';
            });

        };

    }
]);

