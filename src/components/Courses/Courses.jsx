import './courses.scss';

import React from 'react';

import { useState } from 'react';

import {
	BUTTON_TEXT,
	mockedAuthorsList,
	mockedCoursesList,
} from '../../contstants';

import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { CreateCourse } from '../CreateCourse/CreateCourse';

export const Courses = ({ changeShowCourses }) => {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	return (
		<>
			<main className='courses'>
				<div className='actions'>
					<SearchBar changeCourses={setCoursesList} />
					<Button text={BUTTON_TEXT[2]} onClick={changeShowCourses} />
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
						/>
					);
				})}
			</main>
		</>
	);
};
