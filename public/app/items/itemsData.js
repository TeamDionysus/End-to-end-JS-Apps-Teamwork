'use strict';

app.factory('itemsData', function ($http, $q) {
    
    var createItem = function (newItem) {
        var deferred = $q.defer();
        
        $http.post('/api/items', newItem)
            .success(function (item) {
            deferred.resolve(item);
        })
            .error(function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    };
    
    return {
        create: createItem
    }
});