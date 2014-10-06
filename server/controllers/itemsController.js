'use strict';

var Item = require('mongoose').model('Item');

module.exports = {
    getAllItems: function (req, res, next) {
        Item.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Items could not be loaded: ' + err);
            }

            res.send(collection);
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
