'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var config = require('../config/env/config')();
var env = config.env || 'development';
// const env = process.env.NODE_ENV || 'development';
// const env = 'development';
var db = {};
var modelRelations = require('./relations/relations');
console.log('config: ', config);
if (config.dbURL) {
    var sequelize = new Sequelize(config.dbURL);
}
else {
    var sequelize = new Sequelize(config.db, config.username, config.password);
}
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    var extension = '.js';
    if (process.env.NODE_ENV == 'development')
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
