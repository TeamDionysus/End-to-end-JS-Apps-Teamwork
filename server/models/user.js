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
        phone: String
    });

    userSchema.method({
        authenticate: function(password) {
            return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
        }
    });

    User = mongoose.model('User', userSchema);
};

function saveUser(user) {
    var salt = encryption.generateSalt();
    var hashedPwd = encryption.generateHashedPassword(salt, user.username);
    User.create({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        salt: salt,
        hashPass: hashedPwd,
        phone: user.phone,
        city: user.city,
        roles: user.roles || []
    });
}

module.exports.seedInitialUsers = function() {
    
    if (!process.env.NODE_ENV) {
        
        User.remove({}, function (error) {
            if (error) return console.log(error);
            
            console.log('Database seeded with users...')
            
            var users = require('./users.json');
            users.forEach(function (user) {
                saveUser(user);
            });
        });  
    }
};