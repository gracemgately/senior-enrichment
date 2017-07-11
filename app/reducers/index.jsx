import { combineReducers } from 'redux'

const initialState = {}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    default: return state
  }
};

export default rootReducer

//NOTE: can initial campuses and students and admin be
//placed inside the store as a way to create a default
//database?
