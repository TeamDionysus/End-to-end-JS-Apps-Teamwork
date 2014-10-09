'use strict';

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

module.exports = {
    getInbox : function (req, res, next) {
        // GET /api/messages/inbox
        var currentUser = req.user;
        Message.find({ 'to': currentUser._id })
            .populate('from to', 'username firstName lastName imageUrl')
            .exec(function (err, messages) {
                if (err) {
                    res.send(err);
                    return console.log('Messages could not be loaded: ' + err);
                }

                res.send(messages);            
                // Mark as read after sent
                messages.forEach(function (m) {
                    m.read = true;
                    m.save();
                });
            });
    },
    getSent : function (req, res, next) {
        // GET /api/messages/inbox
        var currentUser = req.user;
        Message.find({ 'from': currentUser._id })
            .populate('from to', 'username firstName lastName imageUrl')
            .exec(function (err, messages) {
                if (err) {
                    res.send(err);
                    return console.log('Messages could not be loaded: ' + err);
                }
                // DO NOT MARK AS READ !!!
                res.send(messages);
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
            .populate('from to', 'username firstName lastName imageUrl')
            .exec(function (err, message) {
                if (err) {
                    res.send(err);
                    return console.log('Message could not be loaded: ' + err);
                }
            
                if (message) {
                    res.send(message);
                    // Mark as read
                    if (!message.read && message.to == currentUser._id) {
                        message.read = true;
                        message.save();
                    }
                } else {
                    res.status(404).send('Message not found!');
                }
            });
    },
    sendMessage: function (req, res, next) {
        //api/messages/send/:id
        var newMessage = new Message({
            content: req.body.content,
            date: new Date(),
            from: req.user._id,
            to: req.params.id,
            read: false
        });
        
        newMessage.save(function (err) {
            if (err) {
                res.send(err);
                return console.log('Error in saving message' + err);
            }
            
            res.send(newMessage);
        });
        
        // This is not necessary
        User.findOne({ _id: req.params.id }).exec(function (err, user) {
            user.messages.push(newMessage);
            user.save();
        });
    }
}