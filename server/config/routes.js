'use strict';

var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.route('/api/users')
        .get(controllers.users.getAllUsers)
        .post(controllers.users.createUser)
        .put(auth.isAuthenticated, controllers.users.updateUser);

//    app.route('/api/users/:id')
//        .get(controllers.users.getById)
//        .put(auth.isAuthenticated(), controllers.users.voteForUser)
//        .post(auth.isInRole('admin'), controllers.users.updateByAdmin)
//        .delete(auth.isInRole('admin'), controllers.users.deleteUser);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
    
    app.route('/api/items')
        .get(controllers.items.getAllItems)
        .post(auth.isAuthenticated, controllers.items.createItem);
    
    app.route('/api/items/:id')
        .get(controllers.items.getItemById);
        
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