import React, { Component } from 'react';
import axios from 'axios';

import store from '../store';
import { getStudents, writeStudentName } from '../reducers';
   
export default class AddStudentToCampus extends Component {

    constructor(props){
        super(props);
        this.state = store.getState();

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    //COMPONENTS: 

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //HANDLERS

    handleChange(event){
        var targetValue = event.target.value;
        store.dispatch(writeStudentName(targetValue));
    }

    onSubmit(event){
        event.preventDefault();
        var userId = this.state.userId;
        if (!userId){
            console.log('no associated user!');
        }
        else {
            this.state.students.forEach(student => {
                if (student.name === this.state.studentName){
                    axios.put(`/api/users/${userId}/campus/${this.props.campusId}/students/${student.id}/edit`,{
                        name: student.name
                    })
                }
            })
        }
    }

    //RENDER
    render(){
        return (
        <div>
            <div className='student-info'>Students:
                <select 
                name='campusName'
                onChange={this.handleChange}>
                <option></option>
                {this.state.students.map(student => {
                    if (student.campusId !== this.props.campusId){
                        return (
                            <option key={student.id}>{student.name}</option>
                        )
                    }
                })
            }
                </select>
            </div>
            <button onClick={this.onSubmit}type="submit" className="login-info btn btn-success">
                    ADD STUDENT
            </button>
        </div>
        )
    }  
}
   