import {login} from '../actions.js';

const initialState = {
  user: {
    auth: false,
    name: null
  },
  stocks: {}
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case login:
      return {
        ...state,
        user: {
          auth: true,
          name: action.payload.name
        }
      };
    default:
      return state;
  }
}

export default mainReducer;