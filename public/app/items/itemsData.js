'use strict';

app.factory('itemsData', function ($http, $q) {
    
    var createItem = function (newItem) {
        var deferred = $q.defer();

        var formData = new FormData();
        formData.append('title', newItem.title);
        formData.append('description', newItem.description);
        formData.append('price', newItem.price);
        formData.append('categories', newItem.categories);
        formData.append('image', newItem.image);
        
        $http.post('/api/items', formData, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }
            )
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
    
    var getById = function(id) {
        var deferred = $q.defer();        
        
        $http.get('/api/items/' + id)
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
        getItems: getItems,
        getById: getById
    }
});