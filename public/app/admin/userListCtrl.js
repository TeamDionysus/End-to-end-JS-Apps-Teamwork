/* global app */

'use strict';

app.controller('UserListCtrl', function($scope, UsersResource) {
    $scope.users = UsersResource.query();
});