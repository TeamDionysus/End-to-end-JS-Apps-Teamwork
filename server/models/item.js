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

module.exports.seedInitialItems = function(callback) {
    
    Item.count({}, function (err, count) {
        if (err) {
            return console.log(err);            
        }
        
        // if db is empty or we are in development mode -> seed
        if (count == 0 || !process.env.NODE_ENV) {
            seed(callback);
        }
    });
};

function seed(callback) {        
    Item.remove({}, function (err) {
        if (err) return console.log(err);

        Item.create(require('./items.json'), function (err) {
            if (err) return console.log(err);

            console.log('Database seeded with items...');

            if (typeof(callback) === "function") {
                callback();
            }
        });
    });
}
