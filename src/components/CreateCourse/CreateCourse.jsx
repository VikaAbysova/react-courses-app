import './createCourse.scss';

import React from 'react';

import { useState } from 'react';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';

import {
	BUTTON_TEXT,
	generateId,
	mockedAuthorsList,
	mockedCoursesList,
} from '../../contstants';

import { pipeDuration } from '../../helpers/pipeDuration';

export const CreateCourse = ({ changeShowCourses }) => {
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [nameValue, setNameValue] = useState('');
	const [durationValue, setDurationValue] = useState('');
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [author, setAuthor] = useState([]);
	// const [newCourses, setNewCourses] = useState([mockedCoursesList]);

	let keyValue = generateId();

	const titleChange = (e) => {
		setTitleValue(e.target.value);
	};
	const descriptionChange = (e) => {
		setDescriptionValue(e.target.value);
	};
	const nameChange = (e) => {
		setNameValue(e.target.value);
	};
	const durationChange = (e) => {
		setDurationValue(e.target.value);
	};

	const createAuthor = (e) => {
		e.preventDefault();
		const newAuthor = [{ id: generateId(), name: nameValue }];
		if (nameValue.length >= 2) {
			mockedAuthorsList.push({
				id: generateId(),
				name: nameValue,
			});
			if (!authorList.find((el) => el.id === newAuthor[0].id)) {
				setAuthorList([...authorList, ...newAuthor]);
			}
			setNameValue('');
		}
	};

	const addAuthor = (id) => (e) => {
		e.preventDefault();
		const authorName = mockedAuthorsList.find(
			(author) => author.id === id
		).name;
		const newAuthor = [
			{
				id: id,
				name: authorName,
			},
		];
		const filteredAuthors = authorList.filter(
			(author) => author.id !== newAuthor[0].id
		);
		setAuthorList([...filteredAuthors]);
		setAuthor([...author, ...newAuthor]);
	};

	const deleteAuthor = (id) => (e) => {
		e.preventDefault();
		const delFilteredAuthors = author.filter((author) => author.id !== id);
		const authorName = mockedAuthorsList.find(
			(author) => author.id === id
		).name;
		const newAuthor = [
			{
				id: id,
				name: authorName,
			},
		];
		setAuthor([...delFilteredAuthors]);
		setAuthorList([...authorList, ...newAuthor]);
	};

	const createCourse = (e) => {
		e.preventDefault();

		if (!titleValue || !descriptionValue || !durationValue) {
			return alert(`
		    Подтвердите действие на странице localhost:3000
		    Please, fill in all fields`);
		}

		const newCourse = {
			id: generateId(),
			title: titleValue,
			description: descriptionValue,
			creationDate: new Date().toLocaleDateString(),
			duration: durationValue,
			authors: author.map((aut) => aut.id),
		};
		// const newCourseList = [...newCourse];

		mockedCoursesList.push(newCourse);
		changeShowCourses();
		// setNewCourses([...newCourses, ...newCourseList]);
	};

	return (
		<article className='creating-course'>
			<form>
				<div className='creating-bar'>
					<div>
						<Input
							labelText={'Title'}
							inputName={'courseTitle'}
							inputType={'text'}
							inputValue={titleValue}
							onChange={titleChange}
							placeholderText={'Enter title...'}
							required={true}
							minLength={'2'}
						/>
					</div>
					<div>
						<Button
							text={BUTTON_TEXT[6]}
							type={'submit'}
							onClick={createCourse}
						/>
					</div>
				</div>
				<label htmlFor='descriptionCourse'>Description</label>
				<br />
				<textarea
					name='descriptionCourse'
					id='descriptionCourse'
					cols='40'
					rows='5'
					placeholder='Enter description'
					minLength='2'
					onChange={descriptionChange}
					value={descriptionValue}
					required={true}
				></textarea>
				<div className='authors-data'>
					<section className='authors-adding'>
						<h2>Add author</h2>
						<Input
							labelText={'Author name'}
							inputType={'text'}
							inputName={'author-name'}
							inputValue={nameValue}
							placeholderText={'Enter author name...'}
							onChange={nameChange}
							minLength={'2'}
							required={true}
						/>
						<br />
						<Button
							text={BUTTON_TEXT[4]}
							onClick={createAuthor}
							id={generateId()}
						/>
					</section>
					<section className='authors'>
						<h2>Authors</h2>
						{authorList.map((author) => {
							keyValue++;
							return (
								<div className='authors-list' key={keyValue}>
									<p key={keyValue}>{author.name}</p>
									<Button
										text={BUTTON_TEXT[5]}
										key={author.id}
										onClick={addAuthor(author.id)}
									/>
								</div>
							);
						})}
					</section>
					<section className='course-duration'>
						<h2>Duration</h2>
						<Input
							labelText={'Duration'}
							inputType={'number'}
							inputName={'duration'}
							inputValue={durationValue}
							placeholderText={'Enter duration in minutes...'}
							onChange={durationChange}
							required={true}
							min={1}
						/>
						<p>
							Duration: <span>{pipeDuration(durationValue)}</span> hours
						</p>
					</section>
					<section className='course-authors'>
						<h2>Course authors</h2>
						{author.map((author) => {
							keyValue++;
							return (
								<div className='authors-list' key={keyValue}>
									<p key={keyValue}>{author.name}</p>
									<Button
										text={BUTTON_TEXT[7]}
										key={author.id}
										onClick={deleteAuthor(author.id)}
									/>
								</div>
							);
						})}
					</section>
				</div>
			</form>
		</article>
	);
};