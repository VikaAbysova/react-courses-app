import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from './user/reducer';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  authors: authorsReducer,
});

const middleware = [ReduxThunk];

export const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
