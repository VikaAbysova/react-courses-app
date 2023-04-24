import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

export const renderWithContext = (reactElem, store) => {
  render(
    <Provider store={store}>
      <Router>{reactElem}</Router>
    </Provider>
  );
};
