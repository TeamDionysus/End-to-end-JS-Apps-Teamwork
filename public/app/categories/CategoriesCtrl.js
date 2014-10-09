'use strict';
/* global app */

app.controller('CategoriesCtrl', 
    function CategoriesCtrl($scope, $routeParams, CategoryResource) {
    
    $scope.items;
    $scope.getItemsByCategoryName = getItemsByCategoryName;
    $scope.data = $scope.getItemsByCategoryName();
    
    function getItemsByCategoryName() {
        CategoryResource.getByName($routeParams.name)
           .then(function (response) {
            console.log(response);
               $scope.items = response;

        }, function (err) {
            console.log(err.error_description);
        });
    }
});