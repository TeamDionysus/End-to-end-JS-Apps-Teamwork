'use strict';

var usersController = require('../controllers/usersController');
var itemsController = require('../controllers/itemsController');
var categoriesController = require('../controllers/categoriesController');
var messagesController = require('../controllers/messagesController');


module.exports = {
    users: usersController,
    items: itemsController,
    categories: categoriesController,
    messages: messagesController
};