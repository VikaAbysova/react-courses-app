import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from 'contstants';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from 'common/Button/Button';
import { pipeDuration } from 'helpers/pipeDuration';
import './courses.scss';

export const Courses = ({ changeShowCourses }) => {
  const [coursesList, setCoursesList] = useState(mockedCoursesList);

  return (
    <>
      <main className="courses">
        <div className="actions">
          <SearchBar changeCourses={setCoursesList} />
          <Button onClick={changeShowCourses}>Add new course</Button>
        </div>
        {coursesList.map((course) => {
          const authorsNames = course.authors.map(
            (id) => mockedAuthorsList.find((author) => author.id === id).name
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

Courses.propTypes = {
  changeShowCourses: PropTypes.func,
};
