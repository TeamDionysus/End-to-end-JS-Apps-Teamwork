'use strict';

var fs = require("fs");
var formidable = require('formidable');
var Item = require('mongoose').model('Item');

var DEFAULT_UPLOAD_DIRECTORY = './public/images';
var DEFAULT_PAGE_SIZE = 12;

//var getImageGuid = function (image) {
//    var guidIndex = image.path.lastIndexOf('/');
//    var guid = image.path.substring(guidIndex + 1);
//    return guid;
//};

var getImageGuid = function (image) {
    var guidIndex = image.path.lastIndexOf('/');
    if (guidIndex < 0) {
        var guidIndex = image.path.lastIndexOf('\\');
    }

    var guid = image.path.substring(guidIndex + 1);
    return guid;
};

module.exports = {
    getAllItems: function (req, res, next) {
        // GET /api/items?category=coding&title=code&orderBy=published&orderType=desc&page=1
        var title = req.query.title || '';
        var category = req.query.category || '';
        var orderBy = req.query.orderBy || '-published';
        var orderType = req.query.orderType === 'asc' ? '' : '-';
        var page = Math.max(req.query.page, 1);
        var featured = req.query.featured || false;

        var query = Item.find()
            .where({ title: new RegExp(title, "i") })
            .where({ category: new RegExp(category, "i") })
            .sort(orderBy)
            .skip(DEFAULT_PAGE_SIZE * (page - 1))
            .limit(DEFAULT_PAGE_SIZE);

        if (featured) {
            query.where({ featured: featured});
        }
        //.select('_id title price')
        query.exec(function (error, collection) {
            if (error) {
                console.error('Error getting items: ' + error);
            } else {
                res.send(collection);
            }
        });
    },
    getByUserId: function (req, res, next) {
        var title = req.query.title || '';
        var category = req.query.category || '';
        var orderBy = req.query.orderBy || 'published';
//        var orderType = req.query.orderType === 'desc' ? '' : '-';
        var page = Math.max(req.query.page, 1);

        Item.find({ owner: req.params.id })
            .where({ title: new RegExp(title, "i") })
            .where({ category: new RegExp(category, "i") })
            .sort(orderBy)
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
        Item.findOne({ _id: req.params.id })
            .populate('owner', 'username firstName lastName city phone imageUrl')
            .exec(function (err, item) {
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
        Item.findOneAndRemove({ _id: req.params.id }, function (err, item) {
            if (err) {
                console.log('Item not found: ' + err);
                res.status(404).send('Item not found: ' + err);
                return;
            }

            res.send(item);
        });
    },
    createItem: function (req, res, next) {
        // CREATE /api/items

        if (!fs.existsSync(DEFAULT_UPLOAD_DIRECTORY)) {
            fs.mkdirSync(DEFAULT_UPLOAD_DIRECTORY);
        }

        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = DEFAULT_UPLOAD_DIRECTORY;
        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {
            var currentUser = req.user;

            var newItem = {
                title: fields.title,
                description: fields.description,
                featured: fields.featured,
                published: new Date(),
                category: fields.category,
                price: fields.price,
                owner: currentUser._id
            };

            if (files.image) {
                var imageGuid = getImageGuid(files.image);
                newItem.imageUrl = imageGuid;
            }

            Item.create(newItem, function (err, item) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }

                res.status(201).send(item);
            });
        });

        form.on('error', function (err) {
            res.status(400).send(err);
            return;
        });
    },
    updateItem: function (req, res, next) {
        // Update /api/items/:id

        if (!fs.existsSync(DEFAULT_UPLOAD_DIRECTORY)) {
            fs.mkdirSync(DEFAULT_UPLOAD_DIRECTORY);
        }

        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = DEFAULT_UPLOAD_DIRECTORY;
        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {

            Item.findOne({ _id: req.params.id }).exec(function (err, item) {
                if (err) {
                    res.status(400).send('Error updating item: ' + err);
                    console.log('Error updating item: ' + err);
                    return;
                }

                item.title = fields.title;
                item.description = fields.description;
                item.featured = fields.featured;
                item.category = fields.category;
                item.price = fields.price;

                if (files.image) {
                    // removes the old image
                    var oldImagePath = DEFAULT_UPLOAD_DIRECTORY + '/' + item.imageUrl;
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlink(oldImagePath);
                    }

                    // set the new imageUrl
                    var newImageGuid = getImageGuid(files.image);
                    item.imageUrl = newImageGuid;
                }

                item.save(function (err, updatedItem, numberAffected) {
                    if (err) {
                        res.status(400).send('Error updating item: ' + err);
                        return;
                    }

                    res.status(200).send('Item updated successfully!');
                });
            });
        });

        form.on('error', function (err) {
            res.status(400).send(err);
            return;
        });
    },
    getItemsCount: function (req, res, next) {
        Item.count({}, function (err, count) {
            if (err) {
                res.status(400).send('Error getting items count: ' + err);
                return;
            }

            res.status(200).send(count.toString());
        });
    }
};