'use strict';
/* global app */

app.controller('CategoriesCtrl', 
    function CategoriesCtrl($scope, $rootScope, $routeParams, CategoryResource, itemsData) {
    
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
            findItems($scope.query);
        }
    });
    
    $scope.orderBy = '-published';
    $scope.query = $rootScope.query || '';
    $scope.findItems = findItems;
    
    function findItems() {
        
        itemsData.getItems($scope.query, $scope.currentPage, $scope.orderBy, $routeParams.name)
                    .then(function (data) {
            $scope.title = $routeParams.name;
            $scope.items = data;
        });
    }
});