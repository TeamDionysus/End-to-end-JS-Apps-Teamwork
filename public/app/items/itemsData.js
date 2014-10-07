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
    
    var getItems = function(query) {
        var deferred = $q.defer();
        
        query = query ? '?title=' + query : '';
        console.log('/api/items' + query);
        
        $http.get('/api/items' + query)
            .success(function (items) {
            deferred.resolve(items);
        })
            .error(function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;        
    };
    
    return {
        create: createItem,
        getItems: getItems
    }
});