import './app.scss';

import React, { useState } from 'react';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';

function App() {
	const [showCourses, setShowCourses] = useState(true);

	return (
		<>
			<Header />
			{showCourses && (
				<Courses changeShowCourses={() => setShowCourses(false)} />
			)}
			{!showCourses && (
				<CreateCourse changeShowCourses={() => setShowCourses(true)} />
			)}
		</>
	);
}

export default App;
