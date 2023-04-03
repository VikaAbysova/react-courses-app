import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'common/Button/Button';
import { BUTTON_TEXT } from 'contstants';
import { dateGenerator } from 'helpers/dateGeneratop';
import './courseCard.scss';

export const CourseCard = ({
  title,
  description,
  creationDate,
  duration,
  authorsNames,
}) => {
  return (
    <article className="course-card">
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <div className="card-body">
        <p className="authors-ellipsis information">
          <span>Authors:</span> {authorsNames.join(', ')}
        </p>
        <p className="information">
          <span>Duration:</span> {duration} hours
        </p>
        <p className="information">
          <span>Created:</span> {dateGenerator(creationDate)}
        </p>
        <Button type="button" text={BUTTON_TEXT[3]} />
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
