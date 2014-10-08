'use strict';

var mongoose = require('mongoose');
var Category;

module.exports.init = function () {
    var categorySchema = new mongoose.Schema({
        name: { type: String, required: '{PATH} is required' }
    });
    
    Category = mongoose.model('Category', categorySchema);
};

module.exports.seedCategories = function() {
    if (!process.env.NODE_ENV) {
        
        Category.remove({}, function (error) {
            if (error) return console.log(error);

            console.log('Old categories cleared from database...')
            Category.create([
                {name: 'Computers'},
                {name: 'Cameras'},
                {name: 'Phones'},
                {name: 'Sports'},
                {name: 'Furniture'},
                {name: 'Art'},
                {name: 'Books'},
                {name: 'Music'},
                {name: 'Clothing'},
                {name: 'Watches'},
                {name: 'Toys'},
                {name: 'Car-parts'},
                {name: 'Baby-gear'},
                {name: 'Misc'}
            ]); 
        });    
    }
    
//    Category.find({}).exec(function(err, collection) {
//        if (err) {
//            console.log('Cannot find categories: ' + err);
//            return;
//        }
//
//        if (collection.length === 0) {
//            Category.create([
//                {name: 'Computers'},
//                {name: 'Cameras'},
//                {name: 'Phones'},
//                {name: 'Sports'},
//                {name: 'Furniture'},
//                {name: 'Art'},
//                {name: 'Books'},
//                {name: 'Music'},
//                {name: 'Clothing'},
//                {name: 'Watches'},
//                {name: 'Toys'},
//                {name: 'Car-parts'},
//                {name: 'Baby-gear'},
//                {name: 'Misc'}
//            ]);           
//        }
//    });
};