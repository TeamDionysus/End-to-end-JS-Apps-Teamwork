/* global app */

'use strict';

app.controller('UserListCtrl', function($scope, UsersResource, adminData, notifier, identity) {

    function reloadUsers() {
        $scope.users = UsersResource.query();
    }

    reloadUsers();

    $scope.deleteUser = function(id){

        if(id !== identity.currentUser._id) {
            adminData.deleteUser(id)
                .then(function (success) {
                    notifier.success(success.message || success);
                    reloadUsers();
                }, function (error) {
                    notifier.error(error.message || error);
                }
            );
        }
        else{
            notifier.error('Cannot delete current user');
        }
    };

    $scope.makeAdmin = function(id){
        adminData.makeAdmin(id)
            .then(function(success){
                notifier.success(success.message || success);
                reloadUsers();
            },function(error){
                notifier.error(error.message || error);
            }
        );
    };

});