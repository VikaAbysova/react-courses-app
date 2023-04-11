import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from 'common/Button/Button';
import { dateGenerator } from 'helpers/dateGeneratop';
import styles from './CourseCard.module.scss';

export const CourseCard = ({
  id,
  title,
  description,
  creationDate,
  duration,
  authorsNames,
}) => {
  const navigate = useNavigate();
  const showCourse = () => navigate(`/courses/${id}`);
  return (
    <article className={styles.course_card}>
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <div className={styles.card_body}>
        <p className={styles.authors_ellipsis && styles.information}>
          <span>Authors:</span> {authorsNames.join(', ')}
        </p>
        <p className={styles.information}>
          <span>Duration:</span> {duration} hours
        </p>
        <p className={styles.information}>
          <span>Created:</span> {dateGenerator(creationDate)}
        </p>
        <Button type="button" onClick={showCourse}>
          Show course
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
};
