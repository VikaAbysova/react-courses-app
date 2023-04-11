import { GET_COURSES } from './actionTypes';

export const getCoursesAll = () => async (dispatch) => {
  const url = 'http://localhost:4000/courses/all';
  //   const setHeaders = {
  //     headers: {
  //       Authorization: localStorage.token,
  //     },
  //   };
  const request = await fetch(url);
  const res = await request.json();
  console.log('getting all courses', res);
  dispatch({
    type: GET_COURSES,
    payload: res.result,
  });
};
