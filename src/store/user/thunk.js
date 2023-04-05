import { CURRENT_USER } from './actionTypes';

export const currentUser = () => async (dispatch) => {
  const url = 'http://localhost:4000/users/me';
  const setHeaders = {
    headers: {
      Authorization: localStorage.token,
    },
  };
  const request = await fetch(url, setHeaders);
  const res = await request.json();
  console.log('res', res);
  console.log('header', setHeaders);
  const user = res.result;
  dispatch({ type: CURRENT_USER, payload: user });
};
