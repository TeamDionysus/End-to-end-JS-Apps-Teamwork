/* global app */

'use strict';

app.controller('MainCtrl', function($scope, $rootScope, $location, cachedCourses, itemsData) {
    $scope.courses = cachedCourses.query();
    
    $scope.findItem = function (query) {
        if (query) {
            
            itemsData
                .getItems(query)
                .then(function (data) {
                    $rootScope.searchedItems = data;
                    $rootScope.searchQuery = query;
                    $location.path('/items');
                });
        }
    };
});