import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from 'common/Button/Button';
import { pipeDuration } from 'helpers/pipeDuration';
import * as ApiServices from 'store/services';
import { getCoursesAction } from 'store/courses/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getCourses } from 'store/selectors';
import { addAuthorsAction } from 'store/authors/actionCreators';
import './courses.scss';

export const Courses = () => {
  const [coursesStatus, setCoursesStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);

  const addNewCourse = () => navigate('/courses/add');
  const changeCoursesStatus = () => setCoursesStatus(false);

  const getCoursesList = async () => {
    const apiResult = await ApiServices.getCoursesRequest();
    if (apiResult.successful) {
      dispatch(getCoursesAction(apiResult.result));
    }
  };
  const getAuthorthList = async () => {
    const apiResult = await ApiServices.getAuthorsRequest();
    if (apiResult.successful) {
      dispatch(addAuthorsAction(apiResult.result));
    }
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
          <Button onClick={addNewCourse}>Add new course</Button>
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
              setCoursesStatus={changeCoursesStatus}
            />
          );
        })}
      </main>
    </>
  );
};
