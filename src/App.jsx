import './app.scss';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

function App() {
	const [userName, setUserName] = useState('');
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Header userName={userName} />}>
					<Route
						path='login'
						element={<Login getUserName={(name) => setUserName(name)} />}
					/>
					<Route path='courses' element={<Courses />} />
					<Route path='registration' element={<Registration />} />
					<Route path='courses/add' element={<CreateCourse />} />
					<Route path='courses/:courseId' element={<CourseInfo />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
