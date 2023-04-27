import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'common/Button/Button';
import { BsPencilFill } from 'react-icons/bs';
import { IoTrashSharp } from 'react-icons/io5';
import { getCourses } from 'store/selectors';
import { getUser } from 'store/selectors';
import * as ApiServices from 'store/api/services';
import { getCoursesAll } from 'store/courses/thunk';
import './courseCard.scss';
import { dateGenerator } from 'helpers/dateGenerator';
import { emptyCoursesAction } from 'store/courses/actionCreators';

export const CourseCard = ({
  id,
  title,
  description,
  creationDate,
  duration,
  authorsNames,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector(getUser).role;
  const courses = useSelector(getCourses);

  const showCourse = () => navigate(`/courses/${id}`);

  const updateCourse = () => navigate(`/courses/update/${id}`);

  const deleteCourse = async () => {
    if (courses.length >= 2) {
      const deletedCourseRequest = await ApiServices.deleteCourse(id);
      if (deletedCourseRequest.successful) {
        dispatch(getCoursesAll());
      }
    }
    dispatch(emptyCoursesAction([]));
  };

  console.log(courses);
  return (
    <article data-testid="course-card" className="course_card">
      <section>
        <h1>{title}</h1>
        <p role="textbox">{description}</p>
      </section>
      <div className="card_body">
        <p role="list" className="authors_ellipsis information">
          <span>Authors:</span> {authorsNames.join(', ')}
        </p>
        <p role="term" className="information">
          <span>Duration:</span> {duration} hours
        </p>
        <p data-testid="date" className="information">
          <span>Created:</span> {dateGenerator(creationDate)}
        </p>
        <Button type="button" onClick={showCourse}>
          Show course
        </Button>
        {userRole === 'admin' && (
          <Button type="button" id="icon" onClick={updateCourse}>
            {<BsPencilFill />}
          </Button>
        )}
        {userRole === 'admin' && (
          <Button type="button" id="icon" onClick={deleteCourse}>
            {<IoTrashSharp />}
          </Button>
        )}
      </div>
    </article>
  );
};

CourseCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  creationDate: PropTypes.string,
  duration: PropTypes.string,
  authorsNames: PropTypes.arrayOf(PropTypes.string),
};
