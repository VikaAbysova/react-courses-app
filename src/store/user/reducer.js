import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return { ...state, ...action.payload };
		case USER_LOGOUT:
			return { ...state, ...userInitialState };
		default:
			return state;
	}
};
