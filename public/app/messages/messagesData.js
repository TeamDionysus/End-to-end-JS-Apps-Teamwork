/* global app */

'use strict';

app.factory('messagesData', function messagesData($http, $q, $routeParams, identity) {
    
    var getInbox = function () {

    };
    
    var sendMessage = function (newMessage) {
        var deferred = $q.defer();
        
        $http.post('/api/messages/send/' + $routeParams.username, newMessage)
        .success(function (message) {
            deferred.resolve(message);
        })
        .error(function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    return {
        getInbox: getInbox,
        sendMessage: sendMessage
    };
});