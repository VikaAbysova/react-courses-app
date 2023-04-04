import './courses.scss';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { BUTTON_TEXT } from '../../contstants';

import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import { pipeDuration } from '../../helpers/pipeDuration';

import * as ApiService from '../../store/services';

import { getCoursesAction } from '../../store/courses/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getCourses } from '../../store/selectors';
import { useState } from 'react';
import { addAuthorsAction } from '../../store/authors/actionCreators';

export const Courses = () => {
  const [coursesStatus, setCoursesStatus] = useState(true);
  // const [coursesList, setCoursesList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);

  const getCoursesList = async () => {
    const apiResult = await ApiService.getCoursesRequest();
    console.log('getCoursesList in function');
    if (apiResult.successful) {
      console.log(apiResult.result);
      dispatch(getCoursesAction(apiResult.result));
    }
  };

  const getAuthorthList = async () => {
    const apiResult = await ApiService.getAuthorsRequest();
    console.log('getAuthorsList in function');
    if (apiResult.successful) {
      console.log(apiResult.result);
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
      {console.log('authors', authors)}
      <main className="courses">
        <div className="actions">
          <SearchBar previousCourses={courses} />
          <Button
            text={BUTTON_TEXT[2]}
            onClick={() => navigate('/courses/add')}
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
