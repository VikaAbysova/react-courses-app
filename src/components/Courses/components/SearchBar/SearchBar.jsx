import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'common/Button/Button';
import { Input } from 'common/Input/Input';
import { mockedCoursesList } from 'contstants';
import './searchBar.scss';

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
    <form className="searchBar">
      <Input
        inputType={'text'}
        inputName={'searchName'}
        placeholderText={'Enter course name...'}
        inputValue={inputValue}
        onChange={onChange}
      />
      <br />
      <Button onClick={searchCourse}>Search</Button>
    </form>
  );
};

SearchBar.propTypes = {
  changeCourses: PropTypes.func,
};
