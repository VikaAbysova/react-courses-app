import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from 'common/Button/Button';
import { BUTTON_TEXT } from 'contstants';
import { dateGenerator } from 'helpers/dateGeneratop';
import { BsPencilFill } from 'react-icons/bs';
import { IoTrashSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from 'store/selectors';
import { getUser } from 'store/selectors';
import * as ApiServices from 'store/services';
import { getCoursesAll } from 'store/courses/thunk';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector(getUser).role;

  const deleteCourse = async () => {
    const deletedCourseRequest = await ApiServices.deleteCourse(id);
    setCoursesStatus();
    if (deletedCourseRequest.successful) {
      dispatch(getCoursesAll());
    }
  };

  return (
    <article className="course-card">
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <div>
        <p className="authors-ellipsis">
          <span>Authors:</span> {authorsNames.join(', ')}
        </p>
        <p>
          <span>Duration:</span> {duration} hours
        </p>
        <p>
          <span>Created:</span> {dateGenerator(creationDate)}
        </p>
        <Button
          type="button"
          text={BUTTON_TEXT[3]}
          onClick={() => navigate(`/courses/${id}`)}
        />
        {userRole === 'admin' && (
          <Button
            type="button"
            text={<BsPencilFill className="icon" />}
            className={'icon'}
            onClick={() => navigate(`/courses/update/${id}`)}
          />
        )}
        {userRole === 'admin' && (
          <Button
            type="button"
            text={<IoTrashSharp className="icon" />}
            className={'icon'}
            onClick={deleteCourse}
          />
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
  setCoursesStatus: PropTypes.func,
};
