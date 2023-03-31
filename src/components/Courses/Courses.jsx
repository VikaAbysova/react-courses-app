import './courses.scss';

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
	BUTTON_TEXT,
	mockedAuthorsList,
	mockedCoursesList,
} from '../../contstants';

import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import { pipeDuration } from '../../helpers/pipeDuration';

export const Courses = () => {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const navigate = useNavigate();

	return (
		<>
			<main className='courses'>
				<div className='actions'>
					<SearchBar changeCourses={setCoursesList} />
					<Button
						text={BUTTON_TEXT[2]}
						onClick={() => navigate('/courses/add')}
					/>
				</div>
				{coursesList.map((course) => {
					const authorsNames = course.authors.map(
						(id) => mockedAuthorsList.find((author) => author.id === id).name
					);
					return (
						<CourseCard
							key={course.id}
							{...course}
							authorsNames={authorsNames}
							duration={pipeDuration(course.duration)}
						/>
					);
				})}
			</main>
		</>
	);
};
