/* global app */

'use strict';

app.controller('ItemsListCtrl', function ($scope, $rootScope, itemsData, CategoryResource) {
    
    $scope.categories = CategoryResource.get();
    $scope.currentPage = 1;
    $scope.numPerPage = 12;
    $scope.maxSize = 5;
    
    itemsData.getCount()
        .then(function (count) {
        $scope.itemsCount = parseInt(count);
    });

    $scope.numPages = function () {
        return Math.ceil($scope.itemsCount / $scope.numPerPage);
    };
    
    $scope.$watch('currentPage', function (newValue) {
        if (newValue != 0) {
            findItem($scope.query);
        }
    });
        
    $scope.sort = '-published';
    $scope.query = $rootScope.searchQuery || '';
    $scope.findItem = findItem;

    function findItem(query) {

        itemsData.getItems($scope.query, $scope.currentPage)
            .then(function (data) {
                $scope.items = data;
            });
    }
    
});