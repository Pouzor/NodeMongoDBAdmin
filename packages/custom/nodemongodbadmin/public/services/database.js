'use strict';

angular.module('mean.nodemongodbadmin').factory('Database', ['$resource',
    function ($resource) {
        return $resource('api/databases/:id', {
            eventId: '@_id'
        }, {
            update: {method: 'PUT'}
        });
    }

]);
