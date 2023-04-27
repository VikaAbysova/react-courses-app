import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from 'common/Button/Button';
import { pipeDuration } from 'helpers/pipeDuration';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getUser, getCourses } from 'store/selectors';
import { currentUser } from 'store/user/thunk';
import { getAuthorsAll } from 'store/authors/thunk';
import { getCoursesAll } from 'store/courses/thunk';
import './courses.scss';

export const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);
  const userRole = useSelector(getUser).role;
  const navigate = useNavigate();
  const disabled = userRole === 'admin' ? false : true;
  const idBtn = userRole !== 'admin' ? 'not-allowed' : 'pointer';

  const callCurrentUser = () => {
    dispatch(currentUser());
    navigate('/courses/add');
  };

  useEffect(() => {
    if (!authors.length) {
      dispatch(getAuthorsAll());
    }
    if (!courses.length && userRole === 'user') {
      dispatch(getCoursesAll());
    }
  }, [authors, courses]);

  return (
    <>
      <main className="courses">
        <div className="actions">
          <SearchBar previousCourses={courses} />
          <Button onClick={callCurrentUser} disabled={disabled} id={idBtn}>
            Add new course
          </Button>
        </div>
        {courses.length >= 1 &&
          courses.map((course) => {
            const authorsNames = course.authors.map(
              (id) => authors.find((author) => author.id === id).name
            );
            return (
              <CourseCard
                key={course.id}
                {...course}
                authorsNames={authorsNames}
                duration={pipeDuration(course.duration)}
              />
            );
          })}
      </main>
    </>
  );
};
