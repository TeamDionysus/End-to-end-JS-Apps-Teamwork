/* global app */

'use strict';

app.controller('ItemsListCtrl', function($scope, $rootScope, cachedCourses, itemsData) {
    $scope.query = $rootScope.searchQuery || '';    
    findItem($scope.query);
    
    $scope.findItem = findItem;
        
    function findItem(query) {
        itemsData
            .getItems($scope.query)
            .then(function (data) {
                $scope.courses = data;
            });        
    }
});