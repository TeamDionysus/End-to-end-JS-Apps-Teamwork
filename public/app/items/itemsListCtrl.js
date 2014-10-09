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
        if (newValue !== 0) {
            findItems();
        }
    });

    $scope.orderBy = '-published';
    $scope.query = $rootScope.searchQuery || '';
    $scope.findItems = findItems;

    function findItems() {

        console.log('query: ' + $scope.query);
        console.log('page: :' + $scope.currentPage);
        console.log('orderBy: ' + $scope.orderBy);

        itemsData.getItems($scope.query, $scope.currentPage, $scope.orderBy)
            .then(function (data) {
                $scope.items = data;
            });
    }
    
});