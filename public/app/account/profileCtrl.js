/* global app, angular */

'use strict';

app.controller('ProfileCtrl', function($scope, $location, $upload, auth, identity, notifier) {

    $scope.onFileSelect = function(image) {
        if (angular.isArray(image)) {
            image = image[0];
        }

        // This is how I handle file types in client side
        if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
            notifier.error('Only PNG and JPEG are accepted.');
            return;
        }

        $scope.uploadInProgress = true;
        $scope.uploadProgress = 0;

        $scope.upload = $upload.upload({
            url: '/upload/image',
            method: 'POST',
            file: image
        }).progress(function(event) {
            $scope.uploadProgress = Math.floor(event.loaded / event.total);
            $scope.$apply();
        }).success(function(data, status, headers, config) {
            $scope.uploadInProgress = false;
            // If you need uploaded file immediately
            $scope.uploadedImage = JSON.parse(data);
        }).error(function(err) {
            $scope.uploadInProgress = false;
            console.log('Error uploading file: ' + err.message || err);
        });
    };


    $scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        phone: identity.currentUser.phone,
        city: identity.currentUser.city,
        imageUrl: identity.currentUser.imageUrl
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