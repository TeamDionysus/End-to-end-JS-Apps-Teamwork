'use strict';

var fs = require("fs");
var formidable = require('formidable');
var Item = require('mongoose').model('Item');

module.exports = {
    getAllItems: function (req, res, next) {
        Item.find({}).exec(function (err, collection) {
            if (err) {
                res.status(400).send('Items could not be loaded: ' + err);
                return;
            }
            
            res.send(collection);
        });
    },
    getItemById: function (req, res, next) {
        Item.findOne({ _id: req.params.id }).exec(function (err, item) {
            if (err) {
                res.status(400).send('Item could not be loaded: ' + err);
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
