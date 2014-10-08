'use strict';

var mongoose = require('mongoose');

var itemsSchema = mongoose.Schema({
    title: { type: String, required: '{PATH} is required' },
    description: String,
    featured: Boolean,
    published: Date,
    category: { type: String, required: '{PATH} is required' },
    price: Number,
    imageUrl: String,
    owner : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
});

var Item = mongoose.model('Item', itemsSchema);

module.exports.seedInitialCourses = function() {
    
    if (!process.env.NODE_ENV) {
        
        Item.remove({}, function (error) {
            if (error) return console.log(error);
            
            console.log('Database seeded with items...')
            
            Item.create(require('./items.json'));
        });    
    }
};
