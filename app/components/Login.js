import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import LoggedIn from './LoggedIn';
import store from '../store';
import { writeUserName, writePwd, createUser, showLogin } from '../reducers';

export default class Login extends Component {

    constructor(){
        super();
        this.state = store.getState();

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //COMPONENTS: 

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    //HANDLERS: 

    handleChange(event){
        var targetName = event.target.name;
        var targetValue = event.target.value.replace(/ /g,'');

        if (targetName === 'username'){
            store.dispatch(writeUserName(targetValue));
        }

        if (targetName === 'password'){
            store.dispatch(writePwd(targetValue));
        }

        //console.log({[targetName]: targetValue})
        //store.dispatch(createUser({[targetName]: targetValue}));
        //use replace and trim to remove whitespace and send an uninterrupted
        //string to the db through the post request
    }

    onSubmit(event){
        event.preventDefault();
        if (this.state.username === '' || this.state.password === ''){
            store.dispatch(createUser({
                //otherwise empty the state 
                username: '',
                password: '',
                userId: null,
                validation: 'Please enter a valid username or password.'
            }))
            
        }
        else {
            axios.post('/api/login', {
                name: this.state.username,
                password: this.state.password
            })
            .then(res => res.data)
            .then(response => {
                    store.dispatch(createUser({
                        username: response.user.name,
                        password: response.user.password,
                        userId: response.user.id,
                        validation: true
                    })
                    )
            })
        }
        this.refs.usernameinfo.value='';//reset forms to empty after submission
        this.refs.passwordinfo.value='';
    }

    handleClick(){
        store.dispatch(showLogin(true));
    }

    //RENDERING: 

    render(){
        return(
            <div>
                <form id='login-input' onSubmit={this.onSubmit}>
                        <div className='login-info'>USERNAME:
                            <input
                                name='username'
                                ref='usernameinfo'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='login-info'>PASSWORD:
                            <input
                                name='password'
                                ref='passwordinfo'
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="submit" className="login-info btn btn-success" onClick={this.handleClick}>
                        LOGIN
                        </button>
                        {this.state.showLoginComponent ? <LoggedIn user={this.state}/> : null}
                    </form>
                </div>
        )
    }
}