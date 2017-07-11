import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';  
    
export default class StatefulCampuses extends Component {
    
    constructor(){
        super();
        this.state = {
            campuses: []
        };//campuses will eventually link to the redux store -- view every time
        //after the first static HOME view
    }

    componentDidMount(){
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => this.setState(campuses))
    }

    render(){
        console.log(this.state)
        return(
            <div>
                 <ul>
                    {this.state.campuses.map(campus => {
                        return <li key={campus.id}>{campus.name}</li>
                    })
                    }
                 </ul>
            </div>
        )
    }
}