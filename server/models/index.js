'use strict';

var UserModel = require('../models/user'),
    ItemModel = require('../models/item'),
	CategoryModel = require('../models/category'),
    MessageModel = require('../models/message');

module.exports = {
    User : UserModel,
    Item : ItemModel,
    Category: CategoryModel,
    Message: MessageModel
};