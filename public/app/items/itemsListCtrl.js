/* global app */

'use strict';

app.controller('ItemsListCtrl', function($scope, $rootScope, itemsData) {
    $scope.query = $rootScope.searchQuery || '';    
    findItem($scope.query);
    
    $scope.findItem = findItem;
        
    function findItem(query) {
        itemsData
            .getItems($scope.query)
            .then(function (data) {
                $scope.items = data;
            });        
    }
});