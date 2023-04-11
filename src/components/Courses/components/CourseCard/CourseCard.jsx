import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'common/Button/Button';
import { dateGenerator } from 'helpers/dateGeneratop';
import styles from './CourseCard.module.scss';

export const CourseCard = ({
  title,
  description,
  creationDate,
  duration,
  authorsNames,
}) => {
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
        <Button type="button">Show course</Button>
      </div>
    </article>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  creationDate: PropTypes.string,
  duration: PropTypes.string,
  authorsNames: PropTypes.arrayOf(PropTypes.string),
};
