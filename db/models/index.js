'use strict';

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is requeired everywhere
const Promise = require('bluebird');

const User = require('./user');
const Student = require('./student');
const Campus = require('./campus')

Campus.hasMany(Student);
Student.belongsTo(Campus);
//enables Student.setCampus(campus,{save: false/true}) and
//Student.getCampus (built-in Sequelize methods)

User.hasMany(Student, {foreignKey: 'studentAdminId'});
Student.belongsTo(User, {foreignKey: 'studentAdminId'});
//enables Student.setUser(user,{save: false/true}) and
//Student.getUser (built-in Sequelize methods)

User.hasMany(Campus, {foreignKey: 'campusAdminId'});
Campus.belongsTo(User, {foreignKey: 'campusAdminId'});
//enables Campus.setUser(user,{save: false/true}) and
//Student.getUser (built-in Sequelize methods)

module.exports = {
	User: User,
	Student: Student,
	Campus: Campus
}
//  - USER who creates campuses --> campus must possess user id 
// 	- STUDENT must posess CAMPUS ID --> which campus they attend; cannot be null (student belongstocampus)
// 	- CAMPUS may have no students