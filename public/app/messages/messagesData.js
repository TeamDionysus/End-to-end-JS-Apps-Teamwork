/* global app */

'use strict';

app.factory('messagesData', function messagesData($http, $q, $routeParams, identity) {
    
    var getInbox = function () {

    };
    
    var sendMessage = function (newMessage) {
        var deferred = $q.defer();
        
        console.log(newMessage);
        
        $http.post('/api/messages/send/' + $routeParams.username, newMessage, {
            //transformRequest: angular.identity,
            //headers: { 'Content-Type': undefined }
        })
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