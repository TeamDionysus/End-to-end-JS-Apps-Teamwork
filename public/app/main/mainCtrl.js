/* global app */

'use strict';

app.controller('MainCtrl', function($scope, $rootScope, $location, identity, itemsData) {
 
    $scope.items;
    $scope.query;
    $scope.getItems = function () {
        itemsData.getItems($scope.query).then(function (res, err) {
            if (err) {
                console.log(err);
            }
   
            $scope.items = res;
        });
    };
    
    $scope.data = $scope.getItems();

    $scope.identity = identity;
    $rootScope.searchQuery = '';
    
    $scope.findItem = function (query) {
        if (query) {
            
            $rootScope.searchQuery = query;
            $location.path('/items');
        }
    };
    
    $scope.ping = function () {
        console.log('- ping');
        identity.socket.emit('ping');
    }
});