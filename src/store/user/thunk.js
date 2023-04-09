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
  const role = res.result.role;
  const name = res.result.name;
  dispatch({
    type: CURRENT_USER,
    payload: { role, name },
  });
};
