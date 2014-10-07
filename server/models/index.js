'use strict';

var UserModel = require('../models/user'),
    ItemModel = require('../models/item'),
	CategoryModel = require('../models/category');

module.exports = {
    User : UserModel,
    Item : ItemModel,
	Category: CategoryModel
};