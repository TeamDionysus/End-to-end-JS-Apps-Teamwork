/* global app, angular */

'use strict';

app.controller('UserSettingsCtrl', function ($scope, $location, $upload, auth, identity, notifier) {

    $scope.onFileSelect = function (image) {
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
        }).progress(function (event) {
            $scope.uploadProgress = Math.floor(event.loaded / event.total);
            $scope.$apply();
        }).success(function (data, status, headers, config) {
            $scope.uploadInProgress = false;
            // If you need uploaded file immediately
            $scope.uploadedImage = JSON.parse(data);
        }).error(function (err) {
            $scope.uploadInProgress = false;
            notifier.error('Error uploading file: ' + err.message || err);
        });
    };


    $scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        phone: identity.currentUser.phone,
        city: identity.currentUser.city,
        imageUrl: identity.currentUser.imageUrl,
        items: [
            {"_id": "543589bf2cca167410a33bd2", "title": "tester", "description": "teast", "published": "2014-10-08T19:00:15.784Z", "category": "Books", "price": 12, "owner": "543548853ce89a3c0d487789", "imageUrl": "aa99ee87f164ec4a8a518d5bffec8f0a.ico", "__v": 0},
            {"_id": "543588ba2cca167410a33bb5", "category": "Computers", "featured": true, "imageUrl": "MacBook_Air_13-inch_35330106_01_620x433.jpg", "price": 890, "description": "Selling my old mac...", "published": "2014-08-29T00:00:00.000Z", "title": "MacBook Air 13\"", "__v": 0},
            {"_id": "543588ba2cca167410a33bb6", "category": "Sports", "featured": false, "imageUrl": "s1600_92037130_1261063239.jpg", "price": 150, "description": "Check this bike!", "published": "2014-08-28T00:00:00.000Z", "title": "BMX Bycicle", "__v": 0},
            {"_id": "543588ba2cca167410a33bb7", "category": "Car-parts", "featured": false, "imageUrl": "$_20.JPG", "price": 180, "description": "A little wear and tear...", "published": "2014-08-27T00:00:00.000Z", "title": "Winter tyres", "__v": 0},
            {"_id": "543588ba2cca167410a33bb8", "category": "Watches", "featured": false, "imageUrl": "SNL001P-3.jpg", "price": 400, "description": "A real luxury item, well preserved.", "published": "2014-08-26T00:00:00.000Z", "title": "Seiko Kinnetic 2K", "__v": 0},
            {"_id": "543588ba2cca167410a33bb9", "category": "Furniture", "featured": false, "imageUrl": "Spherical-Luxury-Lamp001.jpg", "price": 75, "description": "You can't find this piece of art any where.", "published": "2014-08-25T00:00:00.000Z", "title": "Luxury Lamp", "__v": 0},
            {"_id": "543588ba2cca167410a33bbc", "category": "Art", "featured": true, "imageUrl": "monet001.jpg", "price": 500, "description": "I bought this from an online auction for $1000.", "published": "2014-08-24T00:00:00.000Z", "title": "Monet reproduction", "__v": 0},
            {"_id": "543588ba2cca167410a33bbb", "category": "Phones", "featured": true, "imageUrl": "iPhone-5-White-Design.jpg", "price": 300, "description": "I am buying the new iPhone 6, so selling this one.", "published": "2014-08-23T00:00:00.000Z", "title": "iPhone 5S like new", "__v": 0},
            {"_id": "543588ba2cca167410a33bbd", "category": "Books", "featured": true, "imageUrl": "britannica001.jpg", "price": 30, "description": "A rare collection, got it from the UK.", "published": "2014-08-22T00:00:00.000Z", "title": "Encyclopedia Britannica", "__v": 0},
            {"_id": "543588ba2cca167410a33bbe", "category": "Cameras", "featured": true, "imageUrl": "canon600D_001.jpg", "price": 500, "description": "I wanted to shoot movies with this one, but the lenses are expensive :(", "published": "2014-08-21T00:00:00.000Z", "title": "Canon 600D", "__v": 0}
        ]
    };

    $scope.update = function (user) {
        auth.update(user).then(function () {
            /*$scope.firstName = user.firstName;
             $scope.lastName = user.lastName;*/
            auth.logout();
            $location.path('/');
        });
    };

});