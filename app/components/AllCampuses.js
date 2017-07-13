import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';  
import SingleCampus from './SingleCampus'
import AddCampus from './AddCampus';

import store from '../store';
import { getCampuses } from '../reducers';
    
export default class AllCampuses extends Component {
    
    constructor(){
        super();
        this.state = store.getState();
    }

    //COMPONENTS: 

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campusesObject => {
            store.dispatch(getCampuses(campusesObject.campuses));
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //RENDER 

    //--> I wanted to use route/switch but couldn't get it to work :( 
        //even though it worked for the allstudent/singlestudent view?

    render(){
        console.log(this.state.campuses)
        return(
            <div className='container-fluid'>
                 <ul>
                    {this.state.campuses.map(campus => {
                        return (
                            <div className='row' key={campus.id}>
                            <li><Link to={`/campus/${campus.id}`}>{campus.name}</Link></li>
                                <Route path={`/campus/${campus.id}`} render={() => (
                                    <SingleCampus singleCampus={campus.id}/>)} />
                            </div>
                            )}
                        )}
                 </ul>
                 <AddCampus/>
            </div>
        )
    }
}




