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
    
    if (!process.env.NODE_ENV) {
        
        Item.remove({}, function (error) {
            if (error) return console.log(error);
            
            console.log('Database seeded with items...')
            
            Item.create({title: 'MacBook Air 13"', featured: true, published: new Date('10/5/2013'), categories: ['Computers'], price: 890, 
                        imageUrl: 'MacBook_Air_13-inch_35330106_01_620x433.jpg'});
            Item.create({title: 'iPhone 5S like new', featured: true, published: new Date('10/6/2013'), categories: ['Phones'], price: 300, 
                        imageUrl: 'iPhone-5-White-Design.jpg'});
            Item.create({title: 'BMX Bycicle', featured: false, published: new Date('10/1/2013'), categories: ['Sports'], price: 150, 
                        imageUrl: 's1600_92037130_1261063239.jpg'});
            Item.create({title: 'Luxury Lamp', featured: false, published: new Date('7/12/2013'), categories: ['Furniture'], price: 75, 
                        imageUrl: 'Contracted-and-Contemporary-K9-Crystal-Desk-bedroom-reading-Adjustable-Light-Golden-Spherical-Luxury-Lamp.jpg_220x220.jpg'});
            Item.create({title: 'Monet reproduction', featured: true, published: new Date('1/1/2013'), categories: ['Art'], price: 500});
            Item.create({title: 'Encyclopedia Britanica', featured: true, published: new Date('10/13/2013'), categories: ['Books'], price: 30});
            Item.create({title: 'Canon 600D', featured: true, published: new Date('3/1/2013'), categories: ['Cameras'], price: 500});
            Item.create({title: 'Awesome Mix Tape', featured: true, published: new Date('2/1/2013'), categories: ['Music'], price: 50});
            Item.create({title: 'Top Gun Jacket', featured: true, published: new Date('10/7/2013'), categories: ['Clothing'], price: 200});
            Item.create({title: 'Seiko Kinnetic 2K', featured: false, published: new Date('8/1/2013'), categories: ['Watches'], price: 400, 
                        imageUrl: 'SNL001P-3.jpg'});
            Item.create({title: 'Woodie', featured: false, published: new Date('11/1/2013'), categories: ['Toys'], price: 20});
            Item.create({title: 'Sony Vaio', featured: true, published: new Date('10/13/2013'), categories: ['Computers'], price: 1430});
            Item.create({title: 'Winter tyres', featured: false, published: new Date('10/1/2013'), categories: ['Car-parts'], price: 180, 
                        imageUrl: '$_20.JPG'});
            Item.create({title: 'used electric wheelchair', featured: true, published: new Date('2/15/2013'), categories: ['Misc'], price: 90});
            Item.create({title: 'Baby stroller', featured: true, published: new Date('7/1/2013'), categories: ['Baby-gear'], price: 380, 
                        imageUrl: '4moms-Origami-Stroller.jpg'});
        });    
    }
};
