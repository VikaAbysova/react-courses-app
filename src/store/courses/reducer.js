import {
  SAVE_COURSE,
  GET_COURSES,
  DELETE_COURSE,
  UPDATE_COURSE,
} from './actionTypes';

export const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
  switch (action.type) {
    case GET_COURSES:
      return [...action.payload];
    case SAVE_COURSE:
      return [...state, { ...action.payload }];
    case UPDATE_COURSE:
      return [...action.payload];
    case DELETE_COURSE:
      return [...action.payload];
    default:
      return state;
  }
};
