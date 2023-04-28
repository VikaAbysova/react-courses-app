import { coursesReducer } from '../reducer';
import * as Actions from '../actionCreators';
import '@testing-library/jest-dom';
import '@testing-library/dom';

describe('CoursesReduser', () => {
  test('reducer should return the initial state', () => {
    const result = coursesReducer(undefined, { type: '' });
    expect(result).toEqual([]);
  });
  test('reducer should handle SAVE_COURSE && returns new state', () => {
    const action = {
      type: Actions.saveCourseAction().type,
      payload: { title: 'Node' },
    };
    const result = coursesReducer([], action);
    expect(result[0].title).toBe('Node');
  });
  test('reducer should handle GET_COURSES && returns new state', () => {
    const action = {
      type: Actions.getCoursesAction().type,
      payload: [{ title: 'Angular' }, { title: 'Node' }],
    };
    const result = coursesReducer([], action);
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Angular');
  });
});
