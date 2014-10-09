/* global app */

'use strict';

app.controller('MainCtrl', function ($scope, $rootScope, $location, identity, itemsData) {
    
    
    $scope.filters = {
        isFeatured: true,
        orderBy : '-published',
        query: ''
    };
    
    $scope.num = 6;
    
    itemsData.getItems($scope.filters).then(function (res, err) {
        if (err) {
            console.log(err);
        }
        
        $scope.featuredItems = res;
        $scope.filters.isFeatured = undefined;

        itemsData.getItems($scope.filters).then(function (res, err) {
            if (err) {
                console.log(err);
            }
            
            
            $scope.latestItems = res;
        });
    });
    
    
    $scope.identity = identity;
    $rootScope.searchQuery = '';
    
    $scope.findItem = function (query) {
        if (query) {
            
            $rootScope.searchQuery = query;
            $location.path('/items');
        }
    };
});