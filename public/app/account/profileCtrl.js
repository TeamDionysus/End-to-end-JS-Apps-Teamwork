/* global app, angular */

'use strict';

app.controller('ProfileCtrl', function ($scope, $location, identity, itemsData, notifier) {

    $scope.user = identity.currentUser;

    itemsData.getByUserId(identity.currentUser._id)
        .then(function (items) {
            $scope.user.items = items;
        }, function (error) {
            notifier.error('Unable to load items from server: ' + error.message || error);
        });

});