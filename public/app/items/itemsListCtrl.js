/* global app */

'use strict';

app.controller('ItemsListCtrl', function($scope, $rootScope, cachedCourses) {
    $scope.query = $rootScope.searchQuery;
    $scope.courses = $rootScope.searchedItems;
});