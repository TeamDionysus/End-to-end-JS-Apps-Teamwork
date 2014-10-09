'use strict';

var Category = require('mongoose').model('Category');

module.exports = {
    getAllCategories: function (req, res, next) {
        Category.find({}).sort('name').exec(function (err, collection) {
            if (err) {
                console.log('Categories could not be loaded: ' + err);
                res.status(400).send(err);
                return;
            }
            
            res.send(collection);
        });
    },
    getCategoryById: function (req, res, next) {
        Category.findOne({ _id: req.params.id }).exec(function (err, category) {
            if (err) {
                console.log('Category could not be loaded: ' + err);
                res.status(400).send(err);
                return;
            }
            
            res.send(category);
        });
    },
    createCategory: function (req, res, next) {
        var newCategory = {
            name: req.body.name
        };

        newCategory.save(function (err) {
            if (err) {
                console.log('Error in saving category: ' + err);
                res.status(400).send(err);
                return;
            }
        });
    }
};