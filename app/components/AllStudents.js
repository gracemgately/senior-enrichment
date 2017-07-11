import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

export default class AllStudents extends Component {
    constructor(){
    super();
    this.state = {
        students: []
    };
    //the state will hold all the campuses
    }

    componentDidMount(){
        axios.get('/api/students')
        .then(res => res.data)
        .then(students => this.setState(students))
    }

    render(){
        return(
            <div>
                 <ul>
                    {this.state.students.map(student => {
                        return <li key={student.id}>{student.name}</li>
                    })
                    }
                 </ul>
            </div>
        )
    }
}