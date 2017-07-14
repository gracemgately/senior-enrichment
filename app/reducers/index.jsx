import { combineReducers } from 'redux'

const initialState = {
  username: '',//--> username through showComponent are from Login.js
  password: '',//they are currently passed as props to LoggedIn.js
  userId: null,
  validation: false,
  showLoginComponent: false,


  campuses: [],//--> campuses is from AllCampuses.js
  students: [],//--> students from AllStudents.js, passed as props
              //to SingleStudent.js

  studentName: '',//--> for adding a single student
  studentCampus: '',//to a particular campus


  campusName: '',//since this logic is essentially the same as 
  campusLocation: ''//adding a new student to a campus, I'll refactor 
  //these methods into one later if there is time
}

//ACTION TYPES

//Login
const WRITE_USERNAME = 'WRITE_USERNAME';
const WRITE_PWD = 'WRITE_PWD';
const CREATE_USER = 'CREATE_USER';
const SHOW_LOGIN = 'SHOW_LOGIN';

//Campuses
const GET_CAMPUSES = 'GET_CAMPUSES';
const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const WRITE_CAMPUS_LOC = 'WRITE_CAMPUS_LOC';

//Students
const GET_STUDENTS = 'GET_STUDENTS';
const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME';
const SELECT_STUDENT_CAMPUS = 'SELECT_STUDENT_CAMPUS';

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

export function writeCampusName(campus){
  const action = {
    type: WRITE_CAMPUS_NAME,
    campusName: campus,
  }
  return action;
}

export function writeCampusLoc(location){
    const action = {
      type: WRITE_CAMPUS_LOC,
      campusLocation: location,
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

export function writeStudentName(student){
  const action = {
    type: WRITE_STUDENT_NAME,
    studentName: student,
  }
  return action;
}

export function selectStudentCampus(campus){
    const action = {
      type: SELECT_STUDENT_CAMPUS,
      studentCampus: campus,
  }
  return action;
}

//THUNK CREATORS
// if there is time I would like to create thunks which GET 
// all students & all campuses; POST new students, campuses, users;
// PUT student information and campus information; DELETE campuses
// and students



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

    case WRITE_CAMPUS_NAME:{
      var newState = Object.assign({}, state, {
          campusName: action.campusName,
      })
      return newState;
    }

    case WRITE_CAMPUS_LOC:{
      var newState = Object.assign({}, state, {
          campusLocation: action.campusLocation,
      })
      return newState;
    }

    case GET_STUDENTS:{
      var newState = Object.assign({}, state, {
        students: action.students
      })
      return newState;
    }

    case WRITE_STUDENT_NAME:{
      var newState = Object.assign({}, state, {
          studentName: action.studentName,
      })
      return newState;
    }

    case SELECT_STUDENT_CAMPUS:{
      var newState = Object.assign({}, state, {
          studentCampus: action.studentCampus,
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
