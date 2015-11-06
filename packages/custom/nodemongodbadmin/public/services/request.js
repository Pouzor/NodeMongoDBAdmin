'use strict';

angular.module('mean.nodemongodbadmin').factory('Request', ['$resource',
    function ($resource) {
        return $resource('api/request',
            { }, {
            save: {method: 'post', isArray:true, timeout: 300000000}
        });
    }

]);
