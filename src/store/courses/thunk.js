import { GET_COURSES } from './actionTypes';

export const getCoursesAll = () => async (dispatch) => {
  const url = 'http://localhost:4000/courses/all';
  const request = await fetch(url);
  const res = await request.json();
  dispatch({
    type: GET_COURSES,
    payload: res.result,
  });
  console.log('res', res);
};
