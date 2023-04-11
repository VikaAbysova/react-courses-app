import {
  DECREASE_AUTHOR,
  DECREASE_AUTHOR_LIST,
  DESCRIPTION_CHANGE,
  DURATION_CHANGE,
  INCREASE_AUTHOR,
  INCREASE_AUTHOR_LIST,
  NAME_CHANGE,
  TITLE_CHANGE,
} from './actionCreateCourseTypes';
import { defaultAuthorsList } from 'contstants';

export const initialState = {
  nameValue: '',
  titleValue: '',
  durationValue: '',
  descriptionValue: '',
  authorList: defaultAuthorsList,
  author: [],
};

export const reducerCreateCourse = (state = initialState, action) => {
  switch (action.type) {
    case TITLE_CHANGE:
      return { ...state, titleValue: action.payload };
    case DESCRIPTION_CHANGE:
      return { ...state, descriptionValue: action.payload };
    case NAME_CHANGE:
      return { ...state, nameValue: action.payload };
    case DURATION_CHANGE:
      return { ...state, durationValue: action.payload };
    case INCREASE_AUTHOR_LIST:
      return {
        ...state,
        authorList: [...state.authorList, { ...action.payload }],
      };
    case DECREASE_AUTHOR_LIST:
      return {
        ...state,
        authorList: [...action.payload],
      };
    case INCREASE_AUTHOR:
      return {
        ...state,
        author: [...state.author, { ...action.payload }],
      };
    case DECREASE_AUTHOR:
      return {
        ...state,
        author: [...action.payload],
      };
    default:
      return state;
  }
};
