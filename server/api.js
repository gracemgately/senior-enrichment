'use strict'
const api = require('express').Router()
const db = require('../db/models');

const User = db.User;
const Campus = db.Campus;
const Student = db.Student;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!

//api.get('/hello', (req, res) => res.send({hello: 'world'}));

//-------CREATE A USER-------

api.post('/login', (req, res) => {
	return User.findAll({where: {name: req.body.name, password: req.body.password}})
	.then(function(user){
		if (!user.length){//if the user doesn't exist, create a new account
			return User.create({
				name: req.body.name,
				password: req.body.password
			})
			.then(function(user){
				res.send({user})
			})
		}
		else {
			var user = user[0]
			res.send({user})
		}//otherwise, send user information
	})
	.catch(console.error())
});

//-------FIND USER INFORMATION-------

api.get('/users', (req, res) => {//all users
	return User.findAll({})
	.then(function(users){
		res.send({users})
	})
	.catch(console.error());
});

api.get('/users/:userId', (req, res) => {//a particular user
	return User.findAll({where: {id: req.params.userId}})
	.then(function(user){
		if (!user.length){
			res.send('This user does not exist.')
		}
		else res.send({user})
	})
	.catch(console.error());
});

//-------POST/UPDATE/DELETE A CAMPUS AS A USER-------

//CREATE A CAMPUS
api.post('/users/:userId/new-campus', (req, res) => {
	return Campus.findAll({where: {name: req.body.name, location: req.body.location}})
	.then(function(campus){
		if (!campus.length){//if the Campus doesn't exist, create a new account
			return Campus.create({
				name: req.body.name,
				location: req.body.location,
				campusAdminId: req.params.userId
			})
			.then(function(campus){
				res.send({campus})
			})
		}
		else {
			return User.findAll({where: {id: req.params.userId}})
			.then(function(user){
				res.send(`${req.body.name} was already created by ${user[0].name}!`)//otherwise, this campus exists
			})
		}
	})
	.catch(console.error())
});

//EDIT CAMPUS NAME OR LOCATION
api.put('/users/:userId/campus/:campusId/edit', (req, res) => {
	//note: currently unable to edit administrators
	return Campus.findById(req.params.campusId)
	.then(function(campus){
		if (campus.campusAdminId !== Number(req.params.userId)){
			res.send('You do not have permission to edit this campus.');
		}
		else {
			return campus.update({
			name: req.body.name,
			location: req.body.location,
			}, {where: {campusAdminId: Number(req.params.userId)}}) //if the old admin is making request
			.then(function(campus){
				res.send(`${campus.name} was updated!`)
				return campus.save()
			});
		}
	})
	.catch(console.error())
});

//DELETE A CAMPUS
api.delete('/users/:userId/campus/:campusId/delete', (req, res) => {
	return Campus.findById(req.params.campusId)
	.then(function(campus){
		if (campus.campusAdminId !== Number(req.params.userId)){
			res.send('You do not have permission to delete this campus.');
		}
		else {
			res.send(`This campus was deleted.`)
			return campus.destroy({force: true}) //if the admin is making request
		}
	})
	.catch(console.error())
});

//-------POST/UPDATE/DELETE A STUDENT AS A USER-------

//ADD A STUDENT TO A CAMPUS
api.post('/users/:userId/campus/:campusId/new-student', (req, res) => {
	return Student.findAll({where: {name: req.body.name, campusId: req.params.campusId}})
	.then(function(student){
		if (!student.length){//if the student doesn't exist, create a new account
			return Student.create({
				name: req.body.name,
				studentAdminId: req.params.userId,
				campusId: req.params.campusId,
			})
			.then(function(student){
				res.send({student})
			})
		}
		else {
			return User.findById(req.params.userId)
			.then(function(user){
				res.send(`${req.body.name} was already enrolled at this campus by ${user.name}!`)
			})
		}//otherwise, student already exists
	})
	.catch(console.error());
});

//EDIT A STUDENT AT A CAMPUS, CHANGE STUDENT TO ANOTHER CAMPUS
api.put('/users/:userId/campus/:campusId/students/:studentId/edit', (req, res) => {
	//note: currently unable to edit administrators
	return Student.findById(req.params.studentId)
	.then(function(student){
		if (student.studentAdminId !== Number(req.params.userId)){
			res.send('You do not have permission to edit this student.');
		}
		else {
			return student.update({
			name: req.body.name,
			campusId: req.params.campusId
			}, {where: {campusAdminId: Number(req.params.userId)}}) //if the old admin is making request
			.then(function(student){
				res.send(`${student.name} was updated!`)
				return student.save()
			});
		}
	})
	.catch(console.error())
});

//DELETE A STUDENT FROM A CAMPUS
api.delete('/users/:userId/students/:studentId/delete', (req, res) => {
	return Student.findById(req.params.studentId)
	.then(function(student){
		if (student.studentAdminId !== Number(req.params.userId)){
			res.send('You do not have permission to delete this student.')
		}
		else {
			res.send(`${student.name} was unenrolled from the school.`)
			return student.destroy({force:true});
		}
	})
	.catch(console.error());
});

//-------FIND CAMPUS INFORMATION-------

api.get('/campus', (req, res) => {
	Campus.findAll({})
	.then(function(campuses){
		res.send({campuses})
	})
	.catch(console.error());
});//send all campuses

//-------FIND STUDENT INFORMATION-------

api.get('/students', (req, res) => {
	Student.findAll({})
	.then(function(students){
		res.send({students})
	})
	.catch(console.error());
});//send all students

api.get('/students/:studentId', (req, res) => {
		Student.findById(req.params.studentId)
		.then(function(student){
			res.send({student})
		})
		.catch(console.error());
});//send particular student


module.exports = api


