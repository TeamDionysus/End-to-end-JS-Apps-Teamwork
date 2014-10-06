/* global app */

'use strict';

app.factory('CourseResource', function($resource) {
    var CourseResource = $resource('/api/items/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return CourseResource;
});