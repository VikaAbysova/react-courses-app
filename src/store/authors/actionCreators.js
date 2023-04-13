import { ADD_AUTHORS, SAVE_AUTHORS } from './actionTypes';

export const addAuthorsAction = (payload) => ({ type: ADD_AUTHORS, payload });

export const saveAuthorsAction = (payload) => ({ type: SAVE_AUTHORS, payload });
