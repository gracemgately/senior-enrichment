'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  }
}, {
    instanceMethods: {
      getCampus: function (){
        return db.model('campus').findAll({
          include: [{
            model: db.model('campus'),
            where: { id: this.campusId } // makes this entire query an inner join
          }]
        })
      }, 
      getAdministrator: function(){
        return db.model('user').findAll({
          include: [{
            model: db.model('user'),
            where: { id: this.userId } // makes this entire query an inner join
          }]
        })
      }
    }
  })