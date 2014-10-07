/* global app */

'use strict';

app.controller('MainCtrl', function($scope, $rootScope, $location, cachedCourses, itemsData) {
    $scope.courses = cachedCourses.query();
    
    $scope.findItem = function (query) {
        if (query) {
            
            $rootScope.searchQuery = query;
            $location.path('/items');
        }
    };
});