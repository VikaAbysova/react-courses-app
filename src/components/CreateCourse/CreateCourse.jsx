import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { generateId, mockedAuthorsList, mockedCoursesList } from 'contstants';
import { pipeDuration } from 'helpers/pipeDuration';
import { useReducer } from 'react';
import {
  initialState,
  reducerCreateCourse,
} from './common/reducerCreateCourse.js';
import {
  decreaseAuthorAction,
  decreaseAuthorListAction,
  descriptionChangeAction,
  durationChangeAction,
  increaseAuthorAction,
  increaseAuthorListAction,
  nameChangeAction,
  titleChangeAction,
} from './common/actionsCreateCourse';
import './createCourse.scss';

export const CreateCourse = ({ changeShowCourses }) => {
  const [state, dispatch] = useReducer(reducerCreateCourse, initialState);
  let keyValue = generateId();

  const createAuthor = (e) => {
    e.preventDefault();
    const newAuthor = { id: generateId(), name: state.nameValue };
    if (state.nameValue.length >= 2) {
      mockedAuthorsList.push(newAuthor);
      if (!state.authorList.find((el) => el.id === newAuthor.id)) {
        dispatch(increaseAuthorListAction({ ...newAuthor }));
      }
      dispatch(nameChangeAction(''));
    }
  };

  const addAuthor = (id) => (e) => {
    e.preventDefault();
    const authorName = state.authorList.find((author) => author.id === id).name;
    const newAuthor = {
      id: id,
      name: authorName,
    };
    const filteredAuthors = state.authorList.filter(
      (author) => author.id !== newAuthor.id
    );
    dispatch(decreaseAuthorListAction(filteredAuthors));
    dispatch(increaseAuthorAction(newAuthor));
  };

  const deleteAuthor = (id) => (e) => {
    e.preventDefault();
    const authorName = state.author.find((author) => author.id === id).name;
    const changeAuthor = {
      id: id,
      name: authorName,
    };
    const delFilteredAuthors = state.author.filter(
      (author) => author.id !== changeAuthor.id
    );
    dispatch(decreaseAuthorAction(delFilteredAuthors));
    dispatch(increaseAuthorListAction(changeAuthor));
  };

  const createCourse = (e) => {
    e.preventDefault();
    if (!state.titleValue || !state.descriptionValue || !state.durationValue) {
      return alert(`
		    Подтвердите действие на странице localhost:3000
		    Please, fill in all fields`);
    }
    const newCourse = {
      id: generateId(),
      title: state.titleValue,
      description: state.descriptionValue,
      creationDate: new Date().toLocaleDateString(),
      duration: state.durationValue,
      authors: state.author.map((aut) => aut.id),
    };
    mockedCoursesList.push(newCourse);
    changeShowCourses();
  };

  return (
    <article className="creating-course">
      <form>
        <div className="creating-bar">
          <div>
            <Input
              labelText={'Title'}
              inputName={'courseTitle'}
              inputType={'text'}
              inputValue={state.titleValue}
              onChange={(e) => dispatch(titleChangeAction(e.target.value))}
              placeholderText={'Enter title...'}
              required={true}
              minLength={'2'}
            />
          </div>
          <div>
            <Button type={'submit'} onClick={createCourse}>
              Create course
            </Button>
          </div>
        </div>
        <label htmlFor="descriptionCourse">Description</label>
        <br />
        <textarea
          name="descriptionCourse"
          id="descriptionCourse"
          cols="40"
          rows="5"
          placeholder="Enter description"
          minLength="2"
          onChange={(e) => dispatch(descriptionChangeAction(e.target.value))}
          value={state.descriptionValue}
          required={true}></textarea>
        <div className="authors-data">
          <section className="authors-adding">
            <h2>Add author</h2>
            <Input
              labelText={'Author name'}
              inputType={'text'}
              inputName={'author-name'}
              inputValue={state.nameValue}
              placeholderText={'Enter author name...'}
              onChange={(e) => dispatch(nameChangeAction(e.target.value))}
              minLength={'2'}
              required={true}
            />
            <br />
            <Button onClick={createAuthor} id={generateId()}>
              Create author
            </Button>
          </section>
          <section className="authors">
            <h2>Authors</h2>
            {state.authorList.map((author) => {
              keyValue++;
              return (
                <div className="authors-list" key={keyValue}>
                  <p className="author-names" key={keyValue}>
                    {author.name}
                  </p>
                  <Button key={author.id} onClick={addAuthor(author.id)}>
                    Add author
                  </Button>
                </div>
              );
            })}
          </section>
          <section className="course-duration">
            <h2>Duration</h2>
            <Input
              labelText={'Duration'}
              inputType={'number'}
              inputName={'duration'}
              inputValue={state.durationValue}
              placeholderText={'Enter duration in minutes...'}
              onChange={(e) => dispatch(durationChangeAction(e.target.value))}
              required={true}
              min={1}
            />
            <p className="duration-info">
              Duration: <span>{pipeDuration(state.durationValue)}</span> hours
            </p>
          </section>
          <section className="course-authors">
            <h2>Course authors</h2>
            {state.author.map((author) => {
              keyValue++;
              return (
                <div className="authors-list" key={keyValue}>
                  <p key={keyValue}>{author.name}</p>
                  <Button key={author.id} onClick={deleteAuthor(author.id)}>
                    Delete author
                  </Button>
                </div>
              );
            })}
          </section>
        </div>
      </form>
    </article>
  );
};

CreateCourse.propTypes = {
  changeShowCourses: PropTypes.func,
};
