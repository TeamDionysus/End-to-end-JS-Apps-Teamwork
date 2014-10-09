/* global app */

'use strict';

app.factory('usersData', function ($http, $q) {

    function getById(id) {
        var deferred = $q.defer();

        $http.get('/api/users/' + id)
            .success(function (user) {
                deferred.resolve(user);
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return {
        getById: getById
    };
});