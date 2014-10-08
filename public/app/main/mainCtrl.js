/* global app */

'use strict';

app.controller('MainCtrl', function($scope, $rootScope, $location, identity, cachedCourses, itemsData) {
    $scope.courses = cachedCourses.query();
    $scope.identity = identity;
    
    $scope.findItem = function (query) {
        if (query) {
            
            $rootScope.searchQuery = query;
            $location.path('/items');
        }
    };
});