/* global app */

'use strict';

app.controller('MainCtrl', function($scope, cachedCourses) {
    $scope.courses = cachedCourses.query();
});