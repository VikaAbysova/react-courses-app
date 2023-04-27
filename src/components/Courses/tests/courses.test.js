import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Courses } from '../Courses';
import { renderWithContext } from 'jest-data/renderWithContext';
import { store, storeInst } from 'jest-data/mockedData';

describe('COURSES', () => {
  test('should display amount of CourseCard equal length of courses array', () => {
    renderWithContext(<Courses />, storeInst);
    const lengthCourses = storeInst.getState().courses.length;
    expect(screen.getAllByTestId('course-card').length).toBe(lengthCourses);
  });
  test(' should display Empty container if courses array length is 0', () => {
    const mockedState = {
      user: {
        isAuth: true,
        name: 'Test Name',
      },
      courses: [],
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
    const storeInst = store(mockedState);
    renderWithContext(<Courses />, storeInst);
    expect(screen.queryByTestId('course-card')).toBeNull();
  });
});
