import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CourseForm/CourseForm';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import PrivateRouter from 'components/PrivateRouter/PrivateRouter';
import './app.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/selectors';
import { currentUser } from './store/user/thunk';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const callCurrentUser = () => {
    dispatch(currentUser());
  };

  useEffect(() => {
    if (localStorage.token) {
      callCurrentUser();
    }
  }, [user.isAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route element={<PrivateRouter />}>
            <Route path="courses/add" element={<CreateCourse />} />
            <Route path="courses/:courseId" element={<CourseInfo />} />
          </Route>
          <Route path="courses" element={<Courses />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
