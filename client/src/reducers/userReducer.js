import {authorized, updatePortfolio } from '../actions.js';

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
    case updatePortfolio:
    console.log(action.payload)
      return {
        ...state,
        stocks: action.payload
      }
    default:
      return state;
  }
}

export default mainReducer;