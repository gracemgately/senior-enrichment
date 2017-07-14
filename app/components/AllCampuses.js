import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import SingleCampus from './SingleCampus'
import AddCampus from './AddCampus';

import store from '../store';
    
export default class AllCampuses extends Component {
    
    constructor(){
        super();
        this.state = store.getState();
    }

    //COMPONENTS: 

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //RENDER 

    render(){
        return(
            <div className='container-fluid'>
                 <ul>
                    {this.state.campuses.map(campus => {
                        return (
                            <div className='row' key={campus.id}>
                            <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Africa_and_Europe_from_a_Million_Miles_Away_%28cropped%29.png/100px-Africa_and_Europe_from_a_Million_Miles_Away_%28cropped%29.png'}/>
                            <li>
                            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link></li>
                                <Route path={`/campuses/${campus.id}`} render={() => (
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




