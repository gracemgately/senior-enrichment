import React, { Component } from 'react';
import axios from 'axios';

import store from '../store';
import {  } from '../reducers';

export default class AddCampus extends Component {   

    constructor(){
        super();
        this.state = store.getState();

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    //COMPONENTS: 

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(this.state));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //HANDLERS

    handleChange(event){
        var targetName = event.target.name;
        var targetValue = event.target.value
        
        if (targetName === 'studentName'){
            store.dispatch(writeStudentName(targetValue));
        }
        if (targetName === 'campusName'){
            store.dispatch(selectStudentCampus(targetValue));
        }

    }

    onSubmit(event){
        event.preventDefault();

        var userId = this.state.userId;
        if (!userId){
            console.log('no associated user!')
        }
        else {
            this.state.campuses.forEach(campus => {
                if (campus.name === this.state.studentCampus){
                    var campusId = campus.id;
                    axios.post(`api/users/${userId}/campus/${campusId}/new-student`,{
                        name: this.state.studentName
                    })
                    .then(res => res.data)
                    .then(response => {
                        if (response.length){
                            console.log(response);
                        }
                        else {
                            var addStudent = this.state.students;
                            addStudent.push(response);
                            store.dispatch(getStudents(addStudent));
                        }
                    })
                }
            })
        }
        this.refs.studentName.value = '';
    }

    render(){
        return (
            <div>
                Add a student:
                    <form id='new-student-input' onSubmit={this.onSubmit}>
                    <div className='student-info'>Name:
                        <input
                            name='studentName'
                            ref='studentName'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='student-info'>Campus:
                        <select 
                        name='campusName'
                        onChange={this.handleChange}>
                        <option></option>
                        {this.state.campuses.map(campus => {
                            return (
                                <option key={campus.id}>{campus.name}</option>
                            )
                        })
                    }
                        </select>
                    </div>
                    <button type="submit" className="login-info btn btn-success">
                        ADD STUDENT
                    </button>
                </form>
            </div>
        )
    }             
}