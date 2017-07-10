'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


var Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  location: {
      type: Sequelize.STRING,
      allowNull: false
  }
  }, {
    instanceMethods: {
      getStudents: function (){
        return db.model('student').findAll({
          include: [{
            model: db.model('student'),
            where: { campusId: this.id } // makes this entire query an inner join
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
  }, {
    hooks: {
      beforeUpdate: function(){
          return getStudents()
          .then(function(students){
          return Promise.map(students, function(student){
              return student.update({campus: campus.name})
              .then(function(student){
              return student.save
              })
            })
          })
      }
    }
  });

module.exports = Campus;