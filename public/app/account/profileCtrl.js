/* global app */

'use strict';

app.controller('ProfileCtrl', function($scope, $location, auth, identity) {
    $scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        phone: identity.currentUser.phone,
        city: identity.currentUser.city
    };

    $scope.update = function(user) {
        auth.update(user).then(function() {
            /*$scope.firstName = user.firstName;
            $scope.lastName = user.lastName;*/
            auth.logout();
            $location.path('/');
        });
    };
});