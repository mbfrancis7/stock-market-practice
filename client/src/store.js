import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers/allReducers.js';
// import xxxxReducer from '//xxxxReducer.js';

const store = createStore(
  reducers,  
  applyMiddleware(thunkMiddleware)
 /*initial state*/)

export default store;