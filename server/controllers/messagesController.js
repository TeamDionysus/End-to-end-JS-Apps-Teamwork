'use strict';

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

//    app.get('/api/messages/inbox', controllers.messages.getInbox);
//    app.get('/api/messages/sent', controllers.messages.getSent);

module.exports = {
    getAll : function (req, res, next) {
        // GET /api/messages/all
        var currentUser = req.user;
        Message.find({ $or:[ {'from': currentUser._id}, {'to': currentUser._id} ]})
            .exec(function (err, collection) {
                if (err) {
                    return console.log('Messages could not be loaded: ' + err);
                }

                res.send(collection);
            });
    },
    getInbox : function (req, res, next) {
        // GET /api/messages/inbox
        var currentUser = req.user;
        Message.find({ 'to': currentUser._id })
            .exec(function (err, collection) {
                if (err) {
                    return console.log('Messages could not be loaded: ' + err);
                }

                res.send(collection);
            });
    },
    getSent : function (req, res, next) {
        // GET /api/messages/inbox
        var currentUser = req.user;
        Message.find({ 'from': currentUser._id })
            .exec(function (err, collection) {
                if (err) {
                    return console.log('Messages could not be loaded: ' + err);
                }

                res.send(collection);
            });
    },
    getMessageById: function (req, res, next) {
        var currentUser = req.user;
        Message.findOne(
            { 
                $and: 
                [
                 {_id: req.params.id},
                 { $or:[ {'from': currentUser._id}, {'to': currentUser._id} ] }
                ]
            })
            .exec(function (err, message) {
            if (err) {
                console.log('Message could not be loaded: ' + err);
            }
            message.read = true;
            message.save();
            res.send(message);
        });
    },
    sendMessage: function (req, res, next) {
        //api/messages/send/:id
        var newMessage = {
            content: req.body.content,
            date: new Date(),
            from: req.user._id,
            to: req.params.id,
            read: false            
        };
        
        newMessage.save(function (err) {
            if (err) {
                return console.log('Error in saving message' + err);
            }
        });
        
        User.findOne({ _id: req.params.id }).exec(function (err, user) {
            user.messages.push(newMessage);
            user.save();
        });
    }
}