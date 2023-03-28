import './searchBar.scss';

import React from 'react';

import { useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';

import { BUTTON_TEXT, mockedCoursesList } from '../../../../contstants';

export const SearchBar = ({ changeCourses }) => {
	const [inputValue, setInputValue] = useState('');

	const onChange = (e) => {
		setInputValue(e.target.value);
		if (!e.target.value) {
			changeCourses(mockedCoursesList);
		}
	};
	const searchCourse = (e) => {
		e.preventDefault();
		const findedCourses = mockedCoursesList.filter(
			(course) =>
				course.id.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
				course.title.toLowerCase().includes(inputValue.toLocaleLowerCase())
		);
		changeCourses(findedCourses);
	};

	return (
		<form className='searchBar'>
			<Input
				inputType={'text'}
				inputName={'searchName'}
				placeholderText={'Enter course name...'}
				inputValue={inputValue}
				onChange={onChange}
			/>
			<br />
			<Button text={BUTTON_TEXT[1]} onClick={searchCourse} />
		</form>
	);
};
