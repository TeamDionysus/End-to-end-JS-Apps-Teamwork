'use strict';

var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var User;

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: { type: String, require: '{PATH} is required', unique: true },
        firstName: { type: String, require: '{PATH} is required' },
        lastName: { type: String, require: '{PATH} is required' },
        salt: String,
        hashPass: String,
        roles: [String],
        city: String,
        imageUrl: String,
        items: [mongoose.model('Item').schema],
        messages: [mongoose.model('Message').schema],
        phone: String
    });

    userSchema.method({
        authenticate: function(password) {
            return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
        }
    });

    User = mongoose.model('User', userSchema);
};

function addPassword(user) {
    // Password is the same as the username
    var salt = encryption.generateSalt();
    var hashedPwd = encryption.generateHashedPassword(salt, user.username);
    user.salt = salt;
    user.hashPass = hashedPwd;
}

module.exports.seedInitialUsers = function(callback) {
    
    if (!process.env.NODE_ENV) {
        
        User.remove({}, function (err) {
            if (err) return console.log(err);            
            
            var users = require('./users.json');
            users.forEach(function (user) {
                addPassword(user);
            });
            
            User.create(users, function (err) {
                if (err) return console.log(err);
                
                console.log('Database seeded with users...');
                
                if (typeof(callback) === "function") {
                    callback();
                }
            });
        });  
    }
};