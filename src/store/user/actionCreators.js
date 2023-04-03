import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

export const userLoginAction = (payload) => ({ type: USER_LOGIN, payload });

export const userLogoutAction = (payload) => ({ type: USER_LOGOUT, payload });
