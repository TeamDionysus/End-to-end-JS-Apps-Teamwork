'use strict';

var mongoose = require('mongoose');
var Message;

module.exports.init = function () {
    var messagesSchema = new mongoose.Schema({
        content: { type: String, required: '{PATH} is required' },
        date: Date,
        from : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        read: Boolean
    });
    
    Message = mongoose.model('Message', messagesSchema);
};