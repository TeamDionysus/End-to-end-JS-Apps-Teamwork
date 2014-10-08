'use strict';

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

module.exports = {
    getAllMesssages : function (req, res, next) {
        Message.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Messages could not be loaded: ' + err);
            }
            
            res.send(collection);
        });
    },
    getMessageById: function (req, res, next) {
        Message.findOne({ _id: req.params.id }).exec(function (err, message) {
            if (err) {
                console.log('Messages could not be loaded: ' + err);
            }
            
            res.send(message);
        });
    },
    sendMessage: function (req, res, next) {
        var newMessage = {
            content: req.body.content,
            date: new Date(),
            from: req.user._id,
            to: req.params.id //api/messages/send/:id if the route is this, otherwise, should be fixed
        };
        
        newMessage.save(function (err) {
            if (err) {
                console.log('Error in saving message' + err);
            }
        });
        
        User.findOne({ _id: req.params.id }).exec(function (err, user) {
            user.messages.push(newMessage);
        });
    }
}