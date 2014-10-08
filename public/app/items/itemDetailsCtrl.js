/* global app */

'use strict';

app.controller('ItemDetailsCtrl', function ($scope, $routeParams, itemsData) {
    $scope.currentItemId = $routeParams.id;

    itemsData.getById($scope.currentItemId)
        .then(function (data) {
            $scope.course = data;
        });
});