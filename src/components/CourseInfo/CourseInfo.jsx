import './courseInfo.scss';

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../common/Button/Button';

import { dateGenerator } from '../../helpers/dateGeneratop';
import { pipeDuration } from '../../helpers/pipeDuration';

import { mockedAuthorsList, mockedCoursesList } from '../../contstants';

export const CourseInfo = () => {
	const navigate = useNavigate();
	const params = useParams();

	const showedCourse = mockedCoursesList.find(
		(course) => course.id === params.courseId
	);

	return (
		<section className='course-info'>
			<div>
				<Button
					text={'ᐸ Back to courses'}
					onClick={() => navigate('/courses')}
				/>
			</div>
			<h1>{showedCourse.title}</h1>
			<div className='description'>
				<p>{showedCourse.description}</p>
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
