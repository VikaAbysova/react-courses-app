import { ADD_AUTHORS } from './actionTypes';

export const getAuthorsAll = () => async (dispatch) => {
  const url = 'http://localhost:4000/authors/all';
  const request = await fetch(url);
  const res = await request.json();
  dispatch({
    type: ADD_AUTHORS,
    payload: res.result,
  });
};