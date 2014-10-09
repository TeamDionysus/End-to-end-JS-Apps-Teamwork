'use strict';

app.controller('SendMessageCtrl', 
    function SendMessageCtrl($scope, messagesData, notifier) {
    
    $scope.sendMessage = function (message, sendMessageForm) {
        
        if (sendMessageForm.$valid) {
            messagesData.sendMessage(message)
            .then(
            function (success) {
                notifier.success("Message sent successfully!");
                //$location.path('/inbox/sendByMe');
            },
            function (error) {
                notifier.error(error.message);
            });
        }
    };
});