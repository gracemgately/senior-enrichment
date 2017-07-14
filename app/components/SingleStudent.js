import React, { Component } from 'react';
import axios from 'axios';

import store from '../store';
import { writeCampusName } from '../reducers';


export default class SingleStudent extends Component {   
    
    constructor(props){
        super(props);
        this.state =  this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    //COMPONENTS

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

        axios.get(`/api/campus/`)
        .then(res => res.data)
        .then(allCampuses => {
            const campusArray = allCampuses.campuses;
            campusArray.forEach(campus => {
                if (campus.id === this.props.student.campusId){
                    store.dispatch(writeCampusName(campus.name));
                }//reusing writeCampusName in the store
            })
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //HANDLERS

    handleClick(event){
        var userId = this.state.userId;
        if (!userId){
            console.log('no associated user!');
        }
        else {
            this.state.students.forEach(student => {
            if (student.id === this.props.student.id){
                axios.delete(`/api/users/${userId}/students/${student.id}/delete`)
                .then(res => res.data)
                .then(response => {
                    console.log(response);
                })
            }
        });
        }
    }

    render(){
        console.log('PROPS', this.props)
        return(
            <div>
            <hr></hr>
                    <div>{this.state.campusName}</div>
                    <button onClick={this.handleClick} type="submit" className="login-info btn btn-danger">
                        DELETE STUDENT
                    </button>
                <hr></hr>
            </div>
        )
    }
}