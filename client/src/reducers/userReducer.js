import {authorized} from '../actions.js';

const initialState = {
  auth: false,
  id: null,
  name: null,
  stocks: {}
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case authorized:
      return {
        ...state,
          auth: true,
          name: action.payload.name,
          id: action.payload.id
      };

    default:
      return state;
  }
}

export default mainReducer;