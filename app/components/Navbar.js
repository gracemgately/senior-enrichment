import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import Login from './Login';

import store from '../store';
import { getStudents, getCampuses } from '../reducers';

export default class Navbar extends Component {

    constructor(){
        super();
        this.state = store.getState();
    }

    //COMPONENTS

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

        axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            store.dispatch(getStudents(students.students))
        });

        axios.get('/api/campus')
        .then(res => res.data)
        .then(campusesObject => {
            store.dispatch(getCampuses(campusesObject.campuses));
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }  

    render(){
        return(
            <div>
            <div id='home-student-nav'>
                <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div>Margaret Hamilton Interplanetary Academy</div>
                    <ul id='student-home'>
                        <span><Link to={`/campuses`}>CAMPUSES</Link></span> / 
                        <span><Link to={`/students`}>STUDENTS</Link></span>
                    </ul>
                    <Login/>
                    </div>
                     </nav>
             </div>
             <div>
                        <Switch>
                        <Route path={`/students`} render={() => (
                            <AllStudents />
                        )} />
                        <Route path={`/campuses`} render={() => (
                            <AllCampuses /> 
                        )} />
                        </Switch>
            </div>
            </div>
        )
    }
}

//HOME goes to homepage (allcampus view)
//STUDENTS goes to allstudents view
