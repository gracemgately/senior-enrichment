import React, { Component } from 'react';
import axios from 'axios';

export default class SingleCampus extends Component {   
    
    constructor(props){
        super(props);
        this.state = {
            campusStudents: []
        };
    }

//will refactor into redux store if have time
    componentDidMount(){
        axios.get(`/api/students`)
        .then(res => res.data)
        .then(allStudents => {
            const studentsArray = allStudents.students;
            studentsArray.forEach(student => {
                if (student.campusId === this.props.singleCampus){
                    var newState = [];
                    newState.push(student)
                    this.setState({campusStudents: newState})
                }
            })
        });
    }

    render(){
        return(
            <div>
            <hr></hr>
            {this.state.campusStudents.map(student => {
                return (<div key={student.id}>{student.name}</div>)
            })
        }
                <hr></hr>
            </div>
        )
    }
}