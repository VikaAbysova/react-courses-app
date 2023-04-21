import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'common/Button/Button';
import { dateGenerator } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';
import { getAuthors, getCourses } from 'store/selectors';
import './courseInfo.scss';

export const CourseInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);
  const showedCourse = courses.find((course) => course.id === params.courseId);
  const backtoCourse = () => navigate('/courses');

  return (
    <section className="course-info">
      <div>
        <Button onClick={backtoCourse}>ᐸ Back to courses</Button>
      </div>
      <h1>{showedCourse.title}</h1>
      <div className="description">
        <p className="description_article">{showedCourse.description}</p>
        <div className="main_information">
          <p>
            <span>ID:</span> {showedCourse.id}
          </p>
          <p>
            <span>Duration:</span> {pipeDuration(showedCourse.duration)} hours
          </p>
          <p>
            <span>Created:</span> {showedCourse.creationDate}
          </p>
          <div>
            <span>Authors:</span>
            {showedCourse.authors.map((id) => {
              const authorsNames = authors.find(
                (author) => author.id === id
              ).name;
              return <p key={id}>{authorsNames}</p>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
