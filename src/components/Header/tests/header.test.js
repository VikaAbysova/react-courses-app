import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../Header';
import { renderWithContext } from 'jest-data/renderWithContext';
import { storeMocked } from 'jest-data/mockedData';

describe('HEADER', () => {
  test('Header renders logo', () => {
    renderWithContext(<Header />, storeMocked);
    const logoElement = screen.getByRole('img', { name: 'logo-image' });
    expect(logoElement).toBeInTheDocument();
  });

  test('Header renders user name element', () => {
    renderWithContext(<Header />, storeMocked);
    const userNameElem = screen.getByTestId('user-name');
    expect(userNameElem).toBeInTheDocument();
  });

  test('Header should renders "Test name" user name', () => {
    renderWithContext(<Header />, storeMocked);
    expect(screen.queryByText('Test name')).toBeInTheDocument();
    expect(screen.getByTestId('user-name')).toHaveTextContent('Test name');
  });
});
