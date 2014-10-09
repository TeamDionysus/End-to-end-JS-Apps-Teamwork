/* global app */

'use strict';

app.controller('InboxCtrl', function InboxCtrl($scope, messagesData, notifier) {

//    messagesData.getInbox()
//        .then(function (messages) {
//            $scope.messages = messages;
//        }, function(error){
//            notifier.error(error.message || error || "Unable to get inbox messages");
//        });

    $scope.messages = [
        {
            title: 'Some message',
            from: {
                username: 'Pesho'
            },
            date: '12.12.2006'
        }
    ];

    console.log($scope.messages);
});