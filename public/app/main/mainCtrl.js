/* global app */

'use strict';

app.controller('MainCtrl', function($scope, $rootScope, $location, identity, cachedCourses, itemsData) {
    $scope.items = cachedCourses.query();
    $scope.identity = identity;
    $rootScope.searchQuery = '';
    
    $scope.findItem = function (query) {
        if (query) {
            
            $rootScope.searchQuery = query;
            $location.path('/items');
        }
    };
});