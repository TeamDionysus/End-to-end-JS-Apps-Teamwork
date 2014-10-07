'use strict';

var fs = require("fs");
var formidable = require('formidable');
var Item = require('mongoose').model('Item');
var DEFAULT_PAGE_SIZE = 10;

module.exports = {
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
        Item.findOne({ _id: req.params.id }).exec(function (err, item) {
            if (err) {
                res.status(400).send('Item could not be loaded: ' + err);
                console.log('Item could not be loaded: ' + err);
                return;
            }

            res.send(item);
        });
    },
    deleteItem: function (req, res, next) {
        // DELETE /api/items/{id}
        Item.findOneAndRemove({_id: req.params.id}, function (err, item) {
            if (err) {
                console.log('Item not found: ' + err);
                res.status(404).send('Item not found: ' + err);
                return;
            }
            
            res.send(item);
        });
    },
    createItem: function (req, res, next) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // TODO: upload image
        });
        
        var currentUser = req.user;

        var newItem = {
            title: req.body.title,
            description: req.body.description,
            featured: req.body.featured,
            published: new Date(),
            categories: req.body.categories,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            owner: currentUser._id
        };

        Item.create(newItem, function (err, item) { 
            if (err) {
                res.status(400);
                res.send(err);
                return;
            }
            
            res.status(201).send(item);
        });
    }
};