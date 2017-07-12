import React, { Component } from 'react';

/*this.props.user={ --> coming from Login.js state
    username:
    password: 
    userId: 
    validation: 
    showComponent: 
}*/

export default class LoggedIn extends Component{
    render(){
        return(
            <div>
            {(this.props.user.validation === true) ? 
                <div>Welcome, {this.props.user.username}.</div> : 
                <div>{this.props.user.validation}</div>}
            </div>
        )
    }
}