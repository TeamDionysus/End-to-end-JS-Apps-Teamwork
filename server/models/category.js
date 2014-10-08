'use strict';

var mongoose = require('mongoose');
var Category;

module.exports.init = function () {
    var categorySchema = new mongoose.Schema({
        name: { type: String, required: '{PATH} is required' }
    });
    
    Category = mongoose.model('Category', categorySchema);
};

module.exports.seedCategories = function(callback) {
    if (!process.env.NODE_ENV) {
        
        Category.remove({}, function (err) {
            if (err) return console.log(err);
            
            var categories = require('./categories.json');
            
            Category.create(categories, function (err) {  
                if (err) return console.log(err);
                
                console.log('Database seeded with categories...');
                
                if (typeof(callback) === "function") {
                    callback();
                }
            }); 
        });    
    }
};