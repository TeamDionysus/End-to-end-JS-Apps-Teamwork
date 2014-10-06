'use strict';

var usersController = require('../controllers/usersController');
var itemsController = require('../controllers/itemsController');

module.exports = {
    users: usersController,
    items: itemsController
};