var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        //db: 'mongodb://localhost/telerikacademycourses',
        db: 'mongodb://admin:123456q@ds039950.mongolab.com:39950/academy-courses',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:123456q@ds039950.mongolab.com:39950/academy-courses',
        port: process.env.PORT || 3030
    }
};