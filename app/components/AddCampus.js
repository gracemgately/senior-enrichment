import React, { Component } from 'react';
import axios from 'axios';

import store from '../store';
import { getCampuses, writeCampusName, writeCampusLoc } from '../reducers';

export default class AddCampus extends Component {   

    constructor(){
        super();
        this.state = store.getState();

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    //COMPONENTS: 

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //HANDLERS

    handleChange(event){
        var targetName = event.target.name;
        var targetValue = event.target.value
        
        if (targetName === 'campusName'){
            store.dispatch(writeCampusName(targetValue));
        }
        if (targetName === 'campusLoc'){
            store.dispatch(writeCampusLoc(targetValue));
        }

    }

    onSubmit(event){
        event.preventDefault();

        var userId = this.state.userId;
        if (!userId){
            console.log('no associated user!')
        }
        else {
            axios.post(`/api/users/${userId}/new-campus`, {
                name: this.state.campusName,
                location: this.state.campusLocation
            })
            .then(res => res.data)
            .then(response => {
                if(response.length){
                    console.log(response);
                }
                else {
                    var addCampus = this.state.campuses;
                    addCampus.push(response);
                    store.dispatch(getCampuses(addCampus));
                }
            })
        }
        this.refs.campusName.value = '';
        this.refs.campusLoc.value = '';
    }

    render(){
        return (
            <div>
                Add a campus:
                    <form id='new-campus-input' onSubmit={this.onSubmit}>
                    <div className='student-info'>Name:
                        <input
                            name='campusName'
                            ref='campusName'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='student-info'>Location:
                        <input 
                        name='campusLoc'
                        ref='campusLoc'
                        onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="login-info btn btn-success">
                        ADD CAMPUS
                    </button>
                </form>
            </div>
        )
    }             
}