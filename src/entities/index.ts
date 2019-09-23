'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { dbURL , database , username , password, enviroment, dbURLHeroku } = require('../config/env');
// const config = require('../config/env')();
// const env = config.env || 'development';
// const env = process.env.NODE_ENV || 'development';
// const env = 'development';
const db : any = {};
const modelRelations = require('./relations/relations');

// console.log('config: ', config);
console.log(dbURLHeroku);

if (dbURLHeroku) {
  var sequelize = new Sequelize(dbURLHeroku);
} else {
  var sequelize = new Sequelize(db, username, password);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    let extension = '.js'
    if(enviroment == 'development') extension = '.ts'
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === `${extension}`);
    // return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
modelRelations(db);
module.exports = db;
