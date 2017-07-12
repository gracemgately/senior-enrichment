import { combineReducers } from 'redux'

const initialState = {
  username: '',//--> username through showComponent are from Login.js
  password: '',//they are currently passed as props to LoggedIn.js
  userId: null,
  validation: false,
  showLoginComponent: false,//
  campuses: [],//--> campuses is from AllCampuses.js
  students: [],//--> students from AllStudents.js, passed as props
              //to SingleStudent.js
}

//ACTION TYPES

//Login
const WRITE_USERNAME = 'WRITE_USERNAME';
const WRITE_PWD = 'WRITE_PWD';
const CREATE_USER = 'CREATE_USER';
const SHOW_LOGIN = 'SHOW_LOGIN';

//Campuses
const GET_CAMPUSES = 'GET_CAMPUSES';

//Students
const GET_STUDENTS = 'GET_STUDENTS';

//ACTION CREATORS

export function writeUserName(value){
  const action = {
    type: WRITE_USERNAME,
    username: value
  };
  
  return action;
}

export function writePwd(value){
  const action = {
    type: WRITE_PWD,
    password: value
  };
  
  return action;
}

export function createUser(user){
  const action = {
    type: CREATE_USER,
    username: user.username,
    password: user.password,
    userId: user.userId,
    validation: user.validation
  };
  
  return action;
}

export function showLogin(bool){
  const action = {
    type: SHOW_LOGIN,
    showLoginComponent: bool
  }
  return action;
}

export function getCampuses(campusesArr){
  const action = {
    type: GET_CAMPUSES,
    campuses: campusesArr
  }
  return action;
}

export function getStudents(studentsArr){
  const action = {
    type: GET_STUDENTS,
    students: studentsArr
  }
  return action;
}

//REDUCER


const rootReducer = function(state = initialState, action) {
  switch(action.type) {

    case WRITE_USERNAME:{
      var newState = Object.assign({}, state, {
        username: action.username, 
      }) 
      return newState;
    }

    case WRITE_PWD:{
      var newState = Object.assign({}, state, {
        password: action.password, 
      }) 
      return newState;
    }

    case CREATE_USER:{
      var newState = Object.assign({}, state, {
        username: action.username,
        password: action.password,
        userId: action.userId,
        validation: action.validation
      })
      return newState;
    }

    case SHOW_LOGIN:{
      var newState = Object.assign({}, state, {
        showLoginComponent: action.showLoginComponent
      })
      return newState;
    }

    case GET_CAMPUSES:{
      var newState = Object.assign({}, state, {
        campuses: action.campuses
      })
      return newState;
    }

    case GET_STUDENTS:{
      var newState = Object.assign({}, state, {
        students: action.students
      })
      return newState;
    }

    default: return state
  }
};

export default rootReducer

//NOTE: can campuses and students and admin be
//placed inside the initial state of the store as a
//way to create a default database?
