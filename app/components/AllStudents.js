import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import SingleStudent from './SingleStudent';
import AddStudent from './AddStudent';

import store from '../store';

export default class AllStudents extends Component {

    constructor(){
        super();
        this.state = store.getState();
    }

    //COMPONENTS

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //RENDER

    render(){
        return(
            <div className = 'container-fluid'>
                 <ul>
                    {this.state.students.map(student => {
                        return (
                            <div className = 'row' key={student.id}>
                            <li>
                                <Link to={`/students/${student.id}`}>{student.name}</Link>
                            </li>
                                <Route path={`/students/${student.id}`} render={() => (
                                    <SingleStudent student={student}/>)} />
                            </div>
                            )}
                        )}
                 </ul>            
                 <AddStudent/>
            </div>
        )
    }
}