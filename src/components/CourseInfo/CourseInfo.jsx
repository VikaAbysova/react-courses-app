import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'common/Button/Button';
import { dateGenerator } from 'helpers/dateGeneratop';
import { pipeDuration } from 'helpers/pipeDuration';
import { mockedAuthorsList, mockedCoursesList } from 'contstants';
import './courseInfo.scss';

export const CourseInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const showedCourse = mockedCoursesList.find(
    (course) => course.id === params.courseId
  );
  const navigateToCourses = () => navigate('/courses');

  return (
    <section className="course-info">
      <div>
        <Button onClick={navigateToCourses}>ᐸ Back to courses</Button>
      </div>
      <h1>{showedCourse.title}</h1>
      <div className="description">
        <p className="information">{showedCourse.description}</p>
        <div>
          <p>
            <span>ID:</span> {showedCourse.id}
          </p>
          <p>
            <span>Duration:</span> {pipeDuration(showedCourse.duration)} hours
          </p>
          <p>
            <span>Created:</span> {dateGenerator(showedCourse.creationDate)}
          </p>
          <div>
            <span>Authors:</span>
            {showedCourse.authors.map((id) => {
              const authorsNames = mockedAuthorsList.find(
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
