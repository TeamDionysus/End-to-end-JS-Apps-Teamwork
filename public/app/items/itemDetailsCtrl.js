/* global app */

'use strict';

app.controller('ItemDetailsCtrl', function($scope, $routeParams, itemsData) {
    itemsData.getById($routeParams.id)
        .then(function (data) {
            $scope.course = data;
        });
});