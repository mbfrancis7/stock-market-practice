import {sayHello} from '../actions.js';

const initialState = {
  user: {},
  stocks: {}
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case(sayHello):
      return state;
    default:
      return state;
  }
}

export default mainReducer;