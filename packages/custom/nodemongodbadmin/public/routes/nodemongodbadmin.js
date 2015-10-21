'use strict';

angular.module('mean.nodemongodbadmin').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('nodemongodbadmin example page', {
            url: '/databases/:name',
            templateUrl: 'nodemongodbadmin/views/database.html'
        });
    }
]);
