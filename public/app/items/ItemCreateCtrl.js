/* global app */

'use strict';

app.controller('ItemCreateCtrl', function ($scope, $location, itemsData, notifier) {

    $scope.submit = function (formData) {

        itemsData.create(formData).then(
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