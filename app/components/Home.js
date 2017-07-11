import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

export default class Home extends Component {
    render(){
        return(
            <div>
                 <Navbar />
            </div>
        )
    }
}




//navbar has home(ALL CAMPUS) and student(ALL STUDENT) views

//HOME: view shows all campuses
//SINGLE CAMPUS: if you click on a particular campus, you see all associated students
//SINGLE STUDENT: click on a student listed at a campus to view their info and campus

//ALL STUDENTS: has all students with associated campus
//click on + button to see add student form
//click on x button to remove a student

//SINGLE STUDENT: click on a student in all students to view that student info and their campus
//SINGLE CAMPUS: click on a student's campus from single student to view that entire campus & all students


    //this is a dumb component which 
    //displays only the first four campuses -- the default static view
