import { USER_LOGIN, USER_LOGOUT, CURRENT_USER } from './actionTypes';

const userInitialState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.payload };
    case USER_LOGOUT:
      return { ...state, ...userInitialState };
    case CURRENT_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
