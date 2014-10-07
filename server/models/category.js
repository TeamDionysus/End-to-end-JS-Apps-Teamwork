'use strict';

var mongoose = require('mongoose');

module.exports.init = function () {
    var categorySchema = new mongoose.Schema({
        name: { type: String, required: '{PATH} is required' }
    });
    
    var Category = mongoose.model('Category', categorySchema);
};