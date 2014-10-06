'use strict';

var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');
var DEFAULT_PAGE_SIZE = 10;

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            phone: req.body.phone,
            city: req.body.city
        };

        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);
        newUserData.roles = ['user'];

        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                res.status(400);
                res.send(false);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }

                res.send(user);
            });
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id.toString() === req.body._id.toString() || req.user.roles.indexOf('admin') >= 0) {

            var updatedUserData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                city: req.body.city
            };

            if (updatedUserData.password && updatedUserData.password.length > 5) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, req.body.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function () {
                res.end();
            });
        }
        else {
            res.send({reason: 'You do not have permissions!'});
        }
    },
    getAllUsers: function (req, res) {

        var page = Math.max(req.query.page, 1);
        var orderType = req.query.orderType === 'desc' ? '-' : '';
        var username = req.query.username || '';
        var firstName = req.query.firstName || '';
        var lastName = req.query.lastName || '';


        User.find({})
            .where({username: new RegExp(username, "i")})
            .where({firstName: new RegExp(firstName, "i")})
            .where({lastName: new RegExp(lastName, "i")})
            .skip(DEFAULT_PAGE_SIZE * (page - 1))
            .limit(DEFAULT_PAGE_SIZE)
            //.sort(orderType + 'rank')
            .select('_id username firstName lastName imageUrl') //city phone roles items
            .exec(function (error, result) {
                if (error) {
                    console.error('Error getting users: ' + error);
                } else {
                    res.send(result);
                }
            });
    }
};