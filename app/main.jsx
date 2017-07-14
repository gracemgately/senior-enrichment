'use strict'
import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory';
const BrowserHistory = createHistory();
// I tried to create/connect to the history object so I could use
// history.push() when creating/updating/deleting elements, 
// but couldn't access it properly inside of the components, 
// even after I installed the history module

import store from './store'
import Home from './components/Home'

render (
  <Provider store={store}>
    <Router history={BrowserHistory}>
        <Home/>
    </Router>
  </Provider>,
  document.getElementById('main')
)