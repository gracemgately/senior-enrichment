import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import SingleStudent from './SingleStudent';

import store from '../store';
import { getStudents } from '../reducers';

export default class AllStudents extends Component {

    constructor(){
        super();
        this.state = store.getState();
    //the state will hold all the campuses
    }

    //COMPONENTS

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

        axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            store.dispatch(getStudents(students.students))
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //RENDER

    render(){
        return(
            <div>
                 <ul>
                    {this.state.students.map(student => {
                        return (
                            <div key={student.id}>
                            <li><Link to={`/students/${student.id}`}>{student.name}</Link></li>
                                <Route path={`/students/${student.id}`} render={() => (
                                    <SingleStudent student={student}/>)} />
                            </div>
                            )}
                        )}
                 </ul>
            </div>
        )
    }
}