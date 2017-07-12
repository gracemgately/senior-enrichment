import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import Login from './Login';

export default class Navbar extends Component {
    render(){
        return(
            <div>
            <div id='home-student-nav'>
                <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id='student-home'>
                        <span><Link to={`/`}>HOME</Link></span> / 
                        <span><Link to={`/students`}>STUDENTS</Link></span>
                    </ul>
                    <Login/>
                    </div>
                     </nav>
             </div>
             <div>
                        <Switch>
                        <Route exact path={`/`} render={() => (
                            <AllCampuses />
                        )} />
                        <Route path={`/students`} render={() => (
                            <AllStudents />
                        )} />
                        </Switch>
            </div>
            </div>
        )
    }
}

//HOME goes to homepage (allcampus view)
//STUDENTS goes to allstudents view
