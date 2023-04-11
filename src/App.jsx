import React, { useCallback, useState } from 'react';
import { Header } from 'components/Header/Header';
import { Courses } from 'components/Courses/Courses';
import { CreateCourse } from 'components/CreateCourse/CreateCourse';
import 'app.scss';

function App() {
  const [showCourses, setShowCourses] = useState(true);
  const changeShowCourses = useCallback(
    () => setShowCourses(!showCourses),
    [showCourses]
  );
  return (
    <>
      <Header />
      {showCourses && <Courses changeShowCourses={changeShowCourses} />}
      {!showCourses && <CreateCourse changeShowCourses={changeShowCourses} />}
    </>
  );
}
export default App;
