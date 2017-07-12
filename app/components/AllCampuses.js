import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';  
import SingleCampus from './SingleCampus'

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
        return(
            <div>
                 <ul>
                    {store.getState().campuses.map(campus => {
                        return (
                            <div key={campus.id}>
                            <li><Link to={`/${campus.id}`}>{campus.name}</Link></li>
                                <Route path={`/${campus.id}`} render={() => (
                                    <SingleCampus/>)} />
                            </div>
                            )}
                        )}
                 </ul>
            </div>
        )
    }
}




