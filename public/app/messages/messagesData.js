/* global app */

'use strict';

app.factory('messagesData', function messagesData($http, $q, identity) {

    var messagesUrl = 'api/messages';

    var getInbox = function(){
        var deferred = $q.defer();

        $http.get(messagesUrl + '/inbox')
            .success(function(response){
                deferred.resolve(response);
            })
            .error(function(error){
                deferred.reject(error);
            });

        return deferred.promise;
    };

    var getSendByMe = function(){
        var deferred = $q.defer();

        $http.get(messagesUrl + '/sent')
            .success(function(response){
                deferred.resolve(response);
            })
            .error(function(error){
                deferred.reject(error);
            });

        return deferred.promise;
    };

    return {
        getInbox: getInbox,
        getSendByMe: getSendByMe
    };
});