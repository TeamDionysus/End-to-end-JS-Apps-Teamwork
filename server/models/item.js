'use strict';

var mongoose = require('mongoose');

var itemsSchema = mongoose.Schema({
    title: { type: String, required: '{PATH} is required' },
    description: String,
    featured: Boolean,
    published: Date,
    categories: [String],
    price: Number,
    imageUrl: String,
    owner : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
});

var Item = mongoose.model('Item', itemsSchema);

module.exports.seedInitialCourses = function() {
    
    Item.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find items: ' + err);
            return;
        }

        if (collection.length === 0) {
            Item.create({title: 'MacBook Air 13"', featured: true, published: new Date('10/5/2013'), categories: ['Computers'], price: 890});
            Item.create({title: 'iPhone 5S new', featured: true, published: new Date('10/12/2013'), categories: ['Phones'], price: 300});
            Item.create({title: 'BMX Bycicle', featured: false, published: new Date('10/1/2013'), categories: ['Sports'], price: 150});
            Item.create({title: 'Luxury Lamp', featured: false, published: new Date('7/12/2013'), categories: ['Furniture'], price: 75});
            Item.create({title: 'Monet reproduction', featured: true, published: new Date('1/1/2013'), categories: ['Art'], price: 500});
            Item.create({title: 'Encyclopedia Britanica', featured: true, published: new Date('10/13/2013'), categories: ['Books'], price: 30});
            Item.create({title: 'Canon 600D', featured: true, published: new Date('3/1/2013'), categories: ['Cameras'], price: 500});
            Item.create({title: 'Awesome Mix Tape', featured: true, published: new Date('2/1/2013'), categories: ['Music'], price: 50});
            Item.create({title: 'Top Gun Jacket', featured: true, published: new Date('10/7/2013'), categories: ['Clothing'], price: 200});
            Item.create({title: 'Seiko Kinnetic 2K', featured: false, published: new Date('8/1/2013'), categories: ['Watches'], price: 400});
            Item.create({title: 'Woodie', featured: false, published: new Date('11/1/2013'), categories: ['Toys'], price: 20});
            Item.create({title: 'Sony Vaio', featured: true, published: new Date('10/13/2013'), categories: ['Computers'], price: 1430});
            Item.create({title: 'Winter tyres', featured: false, published: new Date('10/1/2013'), categories: ['Car-parts'], price: 180});
            Item.create({title: 'used electric wheelchair', featured: true, published: new Date('2/15/2013'), categories: ['Misc'], price: 90});
            Item.create({title: 'Baby stroller', featured: true, published: new Date('7/1/2013'), categories: ['Baby-gear'], price: 80});
        }
    });
};
