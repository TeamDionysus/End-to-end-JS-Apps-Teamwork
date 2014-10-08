'use strict';

var mongoose = require('mongoose');
var Message;

module.exports.init = function () {
    var messagesSchema = mongoose.Schema({
        content: { type: String, required: '{PATH} is required' },
        from : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    });
    
    Message = mongoose.model('Message', messagesSchema);
};