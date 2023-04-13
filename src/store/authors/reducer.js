import { ADD_AUTHORS, SAVE_AUTHORS } from './actionTypes';

export const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
  switch (action.type) {
    case ADD_AUTHORS:
      return [...action.payload];
    case SAVE_AUTHORS:
      return [...state, action.payload];
    default:
      return state;
  }
};
