'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'
import Home from './components/Home'

render (
  <Provider store={store}>
    <Home/>
  </Provider>,
  document.getElementById('main')
)