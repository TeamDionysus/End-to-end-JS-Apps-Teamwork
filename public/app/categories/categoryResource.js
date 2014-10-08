'use strict';

app.factory('CategoryResource', ['$resource', function($resource) {
    var CategoryResource = $resource('/api/categories');
    //$resource('/api/categories', {}, {'query': {method: 'GET', isArray: false}}); 

    var cachedCategories;

    return {
        get: function() {
            if (!cachedCategories) {
                cachedCategories = CategoryResource.query();
            }

            return cachedCategories;
        }
    }
}]);