import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BUTTON_TEXT } from 'contstants';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from 'common/Button/Button';
import { pipeDuration } from 'helpers/pipeDuration';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getUser, getCourses } from 'store/selectors';
import { currentUser } from 'store/user/thunk';
import { getCoursesAll } from 'store/courses/thunk';
import { getAuthorsAll } from 'store/authors/thunk';
import './courses.scss';

export const Courses = () => {
  const [coursesStatus, setCoursesStatus] = useState(true);

  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);
  const userRole = useSelector(getUser).role;
  const navigate = useNavigate();
  const disabled = userRole === 'admin' ? false : true;
  const className = userRole !== 'admin' ? 'not-allowed' : 'pointer';

  const callCurrentUser = () => {
    dispatch(currentUser());
    navigate('/courses/add');
  };
  const getCoursesList = () => {
    dispatch(getCoursesAll());
  };
  const getAuthorthList = () => {
    dispatch(getAuthorsAll());
  };

  useEffect(() => {
    if (!authors.length) {
      getAuthorthList();
    }
  }, [authors]);

  useEffect(() => {
    if (!courses.length && coursesStatus) {
      getCoursesList();
    }
  }, [courses]);

  return (
    <>
      <main className="courses">
        <div className="actions">
          <SearchBar previousCourses={courses} />
          <Button
            text={BUTTON_TEXT[2]}
            onClick={callCurrentUser}
            disabled={disabled}
            className={className}
          />
        </div>
        {courses.map((course) => {
          const authorsNames = course.authors.map(
            (id) => authors.find((author) => author.id === id).name
          );
          return (
            <CourseCard
              key={course.id}
              {...course}
              authorsNames={authorsNames}
              duration={pipeDuration(course.duration)}
              setCoursesStatus={() => setCoursesStatus(false)}
            />
          );
        })}
      </main>
    </>
  );
};
