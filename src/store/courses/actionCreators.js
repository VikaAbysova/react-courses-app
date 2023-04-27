import {
  DELETE_COURSE,
  EMPTY_COURSES,
  GET_COURSES,
  SAVE_COURSE,
  UPDATE_COURSE,
} from './actionTypes';

export const saveCourseAction = (payload) => ({ type: SAVE_COURSE, payload });

export const deleteCourseAction = (payload) => ({
  type: DELETE_COURSE,
  payload,
});
export const updateCourseAction = (payload) => ({
  type: UPDATE_COURSE,
  payload,
});
export const getCoursesAction = (payload) => ({ type: GET_COURSES, payload });

export const emptyCoursesAction = (payload) => ({
  type: EMPTY_COURSES,
  payload,
});
