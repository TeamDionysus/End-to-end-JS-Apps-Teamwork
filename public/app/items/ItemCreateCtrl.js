/* global app */

'use strict';

app.controller('ItemCreateCtrl', function ($scope, $location, itemsData, notifier) {
    
    // TODO: remove it if we submit the form automatically
    $scope.createItem = function (item) {
        console.dir(item);
        itemsData.create(item).then(
            function (success) {
                notifier.success("Offer added successfully!");
                $location.path('/');
            },
            function (error) {
                notifier.error(error.message);
            }
        );
    };
});