import configureStore from 'redux-mock-store';

export const mockedState = {
  user: {
    isAuth: true,
    name: 'Test name',
    email: 'admin@email.com',
    role: 'admin',
  },
  courses: [
    {
      title: 'Angular',
      description: '',
      duration: 214,
      authors: [
        'ac3dfa84-040a-4f0b-a51c-0eb1252e00d4',
        '4876f27f-123c-4b1f-8ef8-361fed2bc685',
      ],
      creationDate: '16/04/2023',
      id: 'f6c2b01d-deee-4f92-8ddc-022994b98f2c',
    },
    {
      title: 'Redux',
      description: 'this is redux...',
      duration: 34,
      authors: [
        'ac3dfa84-040a-4f0b-a51c-0eb1252e00d4',
        '4876f27f-123c-4b1f-8ef8-361fed2bc685',
      ],
      creationDate: '21/04/2023',
      id: '3cde3f67-1f5e-4ba7-85af-99a462a279a6',
    },
  ],
  authors: [
    {
      name: 'Vika',
      id: 'ac3dfa84-040a-4f0b-a51c-0eb1252e00d4',
    },
    {
      name: 'Kolya',
      id: '4876f27f-123c-4b1f-8ef8-361fed2bc685',
    },
  ],
};

const middlewares = [];
export const store = configureStore(middlewares);
export const storeInst = store(mockedState);
