import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from 'common/Button/Button';
import { dateGenerator } from 'helpers/dateGeneratop';
import { BsPencilFill } from 'react-icons/bs';
import { IoTrashSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseAction } from 'store/courses/actionCreators';
import { getCourses } from 'store/selectors';
import './courseCard.scss';

export const CourseCard = ({
  id,
  title,
  description,
  creationDate,
  duration,
  authorsNames,
  setCoursesStatus,
}) => {
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const navigate = useNavigate();
  const showCourse = () => navigate(`/courses/${id}`);

  const deleteCourse = () => {
    const filteredCourses = courses.filter((course) => course.id !== id);
    setCoursesStatus();
    dispatch(deleteCourseAction(filteredCourses));
  };

  return (
    <article className="course_card">
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <div className="card_body">
        <p className="authors_ellipsis information">
          <span>Authors:</span> {authorsNames.join(', ')}
        </p>
        <p className="information">
          <span>Duration:</span> {duration} hours
        </p>
        <p className="information">
          <span>Created:</span> {dateGenerator(creationDate)}
        </p>
        <Button type="button" onClick={showCourse}>
          Show course
        </Button>
        <Button type="button" id="icon">
          {<BsPencilFill />}
        </Button>
        <Button type="button" id="icon" onClick={deleteCourse}>
          {<IoTrashSharp />}
        </Button>
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
  setCoursesStatus: PropTypes.func,
};
