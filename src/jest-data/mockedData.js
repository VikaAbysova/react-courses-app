import configureStore from 'redux-mock-store';

export const mockedState = {
  user: {
    isAuth: true,
    name: 'Test name',
  },
  courses: [],
  authors: [],
};

export const mockedStore = {
  getState: () => mockedState,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

const store = configureStore();
export const storeMocked = store(mockedStore.getState());
