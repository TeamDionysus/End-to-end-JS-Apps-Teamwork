/* global app, angular */

'use strict';

app.controller('UserDetailsCtrl', function ($scope, $routeParams, usersData, itemsData, notifier) {

    $scope.currentUserId = $routeParams.id;

    usersData.getById($scope.currentUserId)
        .then(function (user) {
            $scope.user = user;
        }, function (error) {
            notifier.error('Unable to load user from server: ' + error.message || error);
        });

    itemsData.getByUserId($scope.currentUserId)
        .then(function (items) {
            $scope.user.items = items;
        }, function (error) {
            notifier.error('Unable to load items from server: ' + error.message || error);
        });

});