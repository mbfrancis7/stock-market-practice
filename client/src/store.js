import { createStore, /* applyMiddleware,*/ combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import thunkMiddleware from 'redux-thunk';

import user from './reducers/userReducer';


const reducers = {
  user,
  form: formReducer
}
const rootReducer = combineReducers(reducers)
const store = createStore(
  rootReducer  
  // applyMiddleware(thunkMiddleware)
 /*initial state*/
 )

export default store;