/* global angular, toastr */

'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider) {

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/courses', {
        templateUrl: '/partials/courses/courses-list',
        controller: 'CoursesListCtrl'
        })
        .when('/courses/:id', {
        templateUrl: '/partials/courses/course-details',
        controller: 'CourseDetailsCtrl'
        })
        .when('/items/create', {
            templateUrl: '/partials/items/item-create',
            controller: 'ItemCreateCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/courses', {
            templateUrl: '/partials/courses/courses-list',
            controller: 'CoursesListCtrl'
        })
        .when('/courses/:id', {
            templateUrl: '/partials/courses/course-details',
            controller: 'CourseDetailsCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'LoginCtrl'
        })
        .when('/items', {
            templateUrl: '/partials/items/items-list',
            controller: 'ItemsListCtrl'
        })
        .when('/items/:id/edit', {
            templateUrl: '/partials/items/item-update',
            controller: 'ItemUpdateCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/items/:id', {
            templateUrl: '/partials/items/item-details',
            controller: 'ItemDetailsCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        });
});

app.run(function($rootScope, $window, notifier) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            notifier.error('You are not authorized!');
            $window.history.back();
        }
    });
});