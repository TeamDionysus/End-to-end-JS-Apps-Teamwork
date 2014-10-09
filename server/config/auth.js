'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');
var jwt_secret = 'foo bar big secret';

function getSocketToken(user) {
        var profile = {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };

      // We are sending the profile inside the token
      var token = jwt.sign(profile, jwt_secret, { expiresInMinutes: 60*5 });
    return token;
}

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({success: false});
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }                

                user.token = getSocketToken(user); 
                res.send({success: true, user: user, token: user.token});
            });
        });

        auth(req, res, next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401);
            res.send("Not authorized for this content");
        }
        else {
            next();
        }
    },
    isInRole: function (role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) >= 0) {
                next();
            }
            else {
                res.status(401);
                res.send("Not authorized for this content");
            }
        };
    }
};