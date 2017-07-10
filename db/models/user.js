'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

//user will need
//  - a user.name: string, cannot be null, does have to be unique
//  - user.password: string, cannot be null, does have to be unique

