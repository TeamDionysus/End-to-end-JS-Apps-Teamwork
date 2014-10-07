'use strict';

var usersController = require('../controllers/usersController');
var itemsController = require('../controllers/itemsController');
var categoriesController = require('../controllers/categoriesController');

module.exports = {
    users: usersController,
    items: itemsController,
	categories: categoriesController
};