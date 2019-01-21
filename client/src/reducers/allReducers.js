import { combineReducers } from 'redux';
// import userFunctionsReducer from './userFunctionsReducer.js';
import mainReducer from './mainReducer.js';
// import workoutListReducer from './workoutListReducer';
// import workoutReducer from './workoutReducer.js';
// import findExerciseReducer from './findExerciseReducer.js';
// import exerciseReducer from './exerciseReducer.js';

export default combineReducers({
  // userFunction: userFunctionsReducer,
  main: mainReducer,
  // workoutList: workoutListReducer,
  // workout: workoutReducer,
  // findExercise: findExerciseReducer,
  // exercise: exerciseReducer
});