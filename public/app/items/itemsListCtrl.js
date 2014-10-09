/* global app */

'use strict';

app.controller('ItemsListCtrl', function ($scope, $rootScope, itemsData, CategoryResource) {

    var filters = {
        orderBy: '-published',
        query: $rootScope.searchQuery || '',
        page: $scope.currentPage
    };

    $scope.filters = filters;

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



    $scope.findItems = findItems;

    function findItems() {
        $scope.filters.page = $scope.currentPage;

        console.log(filters);
        itemsData.getItems($scope.filters)
            .then(function (data) {
                $scope.items = data;
            });
    }
    
});