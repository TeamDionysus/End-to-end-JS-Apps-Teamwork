'use strict';

app.directive('itemsGrid', function () {
    return {
        restrict: 'A',
        templateUrl: '/partials/directives/items-grid',
        scope: {
            items: '=',
            sort: '='
        },
        replace: true
    }
})