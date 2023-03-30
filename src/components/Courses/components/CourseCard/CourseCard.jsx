import './courseCard.scss';

import React from 'react';

import PropTypes from 'prop-types';

import { Button } from '../../../../common/Button/Button';

import { BUTTON_TEXT } from '../../../../contstants';

import { dateGenerator } from '../../../../helpers/dateGeneratop';

export const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	authorsNames,
}) => {
	return (
		<article className='course-card'>
			<section>
				<h1>{title}</h1>
				<p>{description}</p>
			</section>
			<div>
				<p className='authors-ellipsis'>
					<span>Authors:</span> {authorsNames.join(', ')}
				</p>
				<p>
					<span>Duration:</span> {duration} hours
				</p>
				<p>
					<span>Created:</span> {dateGenerator(creationDate)}
				</p>
				<Button type='button' text={BUTTON_TEXT[3]} />
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
