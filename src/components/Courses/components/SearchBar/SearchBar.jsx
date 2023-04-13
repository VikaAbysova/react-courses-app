import React from 'react';
import { useState } from 'react';
import { Button } from 'common/Button/Button';
import { Input } from 'common/Input/Input';
import { BUTTON_TEXT } from 'contstants';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from 'store/selectors';
import { updateCourseAction } from 'store/courses/actionCreators';
import './searchBar.scss';

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [previousCourses, setPreviousCourses] = useState([]);
  const courses = useSelector(getCourses);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      dispatch(updateCourseAction(previousCourses));
    }
  };
  const searchCourse = (e) => {
    e.preventDefault();
    const findedCourses = courses.filter(
      (course) =>
        course.id.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
        course.title.toLowerCase().includes(inputValue.toLocaleLowerCase())
    );
    setPreviousCourses(courses);
    dispatch(updateCourseAction(findedCourses));
  };

  return (
    <form className="searchBar">
      <Input
        inputType={'text'}
        inputName={'searchName'}
        placeholderText={'Enter course name...'}
        inputValue={inputValue}
        onChange={onChange}
      />
      <br />
      <Button text={BUTTON_TEXT[1]} onClick={searchCourse} type="button" />
    </form>
  );
};
