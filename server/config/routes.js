'use strict';

var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);
    // put('api/users/:id' (auth.isInRole(admin) //update from admin
    // delete (auth.isInRole('admin')
    // get ?page,name,orderBy, orderType

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/items', controllers.items.getAllItems);
    app.get('/api/items/:id', controllers.items.getItemById);
    // add routes for items put/post (CRUD)
    // /api?page={page},orderBy,orderType,name  (GET)
    // /api/items auth.isInRole('admin') (DEL)
    // /api/items (PUT) update
    
    
    //Categories
   // app.('api/categories')
        

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.get('/api/*', function (req, res) {
        res.render('index');
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};