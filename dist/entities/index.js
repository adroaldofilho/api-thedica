'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var _a = require('../config/env'), dbURL = _a.dbURL, database = _a.database, username = _a.username, password = _a.password, enviroment = _a.enviroment;
// const config = require('../config/env')();
// const env = config.env || 'development';
// const env = process.env.NODE_ENV || 'development';
// const env = 'development';
var db = {};
var modelRelations = require('./relations/relations');
// console.log('config: ', config);
console.log(dbURL);
if (dbURL) {
    var sequelize = new Sequelize(dbURL);
}
else {
    var sequelize = new Sequelize(db, username, password);
}
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    var extension = '.js';
    if (enviroment == 'development')
        extension = '.ts';
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === "" + extension);
    // return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
modelRelations(db);
module.exports = db;
