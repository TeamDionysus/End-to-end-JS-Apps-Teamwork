'use strict';

var Item = require('mongoose').model('Item');
var DEFAULT_PAGE_SIZE = 10;

module.exports = {
//    getAllItems: function (req, res, next) {
//        Item.find({}).exec(function (err, collection) {
//            if (err) {
//                console.log('Items could not be loaded: ' + err);
//            }
//
//            res.send(collection);
//        });
//    },
    getAllItems: function (req, res, next) {
        // GET /api/items?category=coding&title=code&orderBy=published&orderType=desc&page=1
        var title = req.query.title || '';
        var category = req.query.category || '';
        var orderBy = req.query.orderBy || 'published';
        var orderType = req.query.orderType === 'desc' ? '-' : '';
        var page = Math.max(req.query.page, 1);
        
        Item.find()
            .where({title: new RegExp(title, "i")})
            .where({categories: new RegExp(category, "i")})
            .sort(orderType + orderBy)
            .skip(DEFAULT_PAGE_SIZE * (page - 1))
            .limit(DEFAULT_PAGE_SIZE)
            //.select('_id title price')
            .exec(function (error, collection) {
                if (error) {
                    console.error('Error getting items: ' + error);
                } else {
                    res.send(collection);
                }
            });
    },
    getItemById: function (req, res, next) {
        Item.findOne({_id: req.params.id}).exec(function (err, course) {
            if (err) {
                console.log('Item could not be loaded: ' + err);
            }

            res.send(course);
        });
    },
    // add CRUD
};
