'use strict'
import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'
import Home from './components/Home'

render (
  <Provider store={store}>
    <Router>
        <Home/>
    </Router>
  </Provider>,
  document.getElementById('main')
)