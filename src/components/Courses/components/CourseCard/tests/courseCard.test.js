import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CourseCard } from '../CourseCard';
import { renderWithContext } from 'jest-data/renderWithContext';
import { storeMocked } from 'jest-data/mockedData';
import { pipeDuration } from 'helpers/pipeDuration';
import { dateGenerator } from 'helpers/dateGenerator';

describe('COURSE CARD', () => {
  beforeEach(() => {
    renderWithContext(
      <CourseCard
        title="Redux"
        description="description text"
        duration={pipeDuration(160)}
        authorsNames={['Vika', 'Kolya', 'Sasha']}
        creationDate={dateGenerator('21/04/2023')}
      />,
      storeMocked
    );
  });

  test('should display title', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Redux');
  });
  test('should display description', () => {
    expect(screen.getByRole('textbox')).toHaveTextContent('description text');
  });
  test('should display duration in the correct format', () => {
    expect(screen.getByRole('term')).toHaveTextContent(/02:40/i);
  });
  test('should display author list', () => {
    expect(screen.getByRole('list')).toHaveTextContent('Vika, Kolya, Sasha');
  });
  test('should display created date in the correct format', () => {
    expect(screen.getByTestId('date')).toHaveTextContent('2.04.2023');
  });
});
