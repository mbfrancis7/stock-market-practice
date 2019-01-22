import { createStore, /* applyMiddleware,*/ combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import thunkMiddleware from 'redux-thunk';

import main from './reducers/mainReducer.js';


const reducers = {
  main,
  form: formReducer
}
const rootReducer = combineReducers(reducers)
const store = createStore(
  rootReducer  
  // applyMiddleware(thunkMiddleware)
 /*initial state*/
 )

export default store;