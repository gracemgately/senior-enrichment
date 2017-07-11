'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('campus', {
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
