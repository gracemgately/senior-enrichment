import React, { Component } from 'react';
import axios from 'axios';

import AddStudentToCampus from './AddStudentToCampus';
import store from '../store';

export default class SingleCampus extends Component {   
    
    constructor(props){//LOCAL STATE
        super(props);
        this.state = {
            campusStudents: []
        };
        this.onClick = this.onClick.bind(this);
    }

    //COMPONENTS

    componentDidMount(){
        axios.get(`/api/students`)
        .then(res => res.data)
        .then(allStudents => {
            const studentsArray = allStudents.students;
            studentsArray.forEach(student => {
                if (student.campusId === this.props.singleCampus){
                    var newState = this.state.campusStudents.concat([student])
                    this.setState({campusStudents: newState});
                }
            })
        });
    }

    //HANDLERS

    onClick(event){
        var userId = store.getState().userId;
        if (!userId){
            console.log('no associated user!');
        }
        else {
            axios.delete(`/api/users/${userId}/campus/${this.props.singleCampus}/delete`)
            .then(res => res.data)
            .then(response => {
                console.log(response);
            })
            .then(() => {
                history.push('/')
            })
        }
    }


    //RENDER

    render(){
        return(
        <div>
            <hr></hr>
            <ul>
            {this.state.campusStudents.map(student => {
                return (<li key={student.id}>{student.name}</li>)
            })
        }
            </ul>
            <hr></hr>
                <div>
                <AddStudentToCampus campusId={this.props.singleCampus}/>
                </div>
                <div>
                <button 
                    onClick={this.onClick}
                    disabled={(this.state.campusStudents.length > 0)}
                    type="submit" 
                    className="login-info btn btn-danger">
                        DELETE CAMPUS
                </button>
                </div>
                <div>(Campus may only be deleted if no students are enrolled.)</div>
        </div>
        )
    }
}