import React, { Component } from 'react';
import axios from 'axios';

export default class SingleStudent extends Component {   
    
    constructor(props){
        super(props);
        this.state = {
            studentCampus: '',
            student: this.props.student
        };
    }

    componentDidMount(){
        axios.get(`/api/campus/`)
        .then(res => res.data)
        .then(allCampuses => {
            const campusArray = allCampuses.campuses;
            campusArray.forEach(campus => {
                if (campus.id === this.props.student.campusId){
                    this.setState({studentCampus: campus.name})
                }
            })
        });
    }

    render(){
        return(
            <div>
            <hr></hr>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-6'>{this.state.student.name}</div>
                        <div className='col-6'>{this.state.studentCampus}</div>
                    </div>
                </div>
                <hr></hr>
            </div>
        )
    }
}