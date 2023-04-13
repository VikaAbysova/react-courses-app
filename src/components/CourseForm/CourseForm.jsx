import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { BUTTON_TEXT, generateId } from 'contstants';
import { pipeDuration } from 'helpers/pipeDuration';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getCourses } from 'store/selectors';
import * as ApiServices from 'store/services';
import { getCoursesAll } from 'store/courses/thunk';
import { getAuthorsAll } from 'store/authors/thunk';
import { useEffect } from 'react';
import './createCourse.scss';
import { updateCourseRequest } from '../../store/services';

export const CourseForm = () => {
  const authors = useSelector(getAuthors);
  const courses = useSelector(getCourses);

  const param = useParams();
  const updateCourse = courses.find((course) => course.id === param.courseId);
  const authorListParam = authors.filter((author) =>
    updateCourse.authors.every((id) => author.id !== id)
  );
  const [authorsParam, setAuthorsParam] = useState([]);
  const [paramsAuth, setParamsAuth] = useState(updateCourse.authors);

  const [titleValue, setTitleValue] = useState(
    param.courseId ? updateCourse.title : ''
  );
  const [descriptionValue, setDescriptionValue] = useState(
    param.courseId ? updateCourse.description : ''
  );
  const [nameValue, setNameValue] = useState('');
  const [durationValue, setDurationValue] = useState(
    param.courseId ? updateCourse.duration.toString() : ''
  );

  const [authorList, setAuthorList] = useState(authors);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    if (param.courseId) {
      setAuthorList(authorListParam);
    }
  }, [authorsParam]);

  let keyValue = generateId();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const createAuthor = async (e) => {
    e.preventDefault();
    if (nameValue.length >= 2) {
      const authorCreated = {
        name: nameValue,
      };
      const postAuthor = await ApiServices.saveNewAuthor(authorCreated);
      if (postAuthor.successful) {
        dispatch(getAuthorsAll());
      }
      const newAuthor = { name: nameValue, id: postAuthor.result.id };

      if (!authorList.find((el) => el.id === newAuthor.id)) {
        setAuthorList([...authorList, newAuthor]);
      }
      setNameValue('');
    }
  };

  const addAuthor = (id) => (e) => {
    e.preventDefault();
    const authorName = authors.find((author) => author.id === id).name;
    const newAuthor = [
      {
        id: id,
        name: authorName,
      },
    ];

    const filteredAuthors = authorList.filter(
      (author) => author.id !== newAuthor[0].id
    );
    param.courseId
      ? setParamsAuth([...paramsAuth, id])
      : setAuthor([...author, ...newAuthor]);
    setAuthorList([...filteredAuthors]);
  };

  const deleteAuthor = (id) => (e) => {
    e.preventDefault();
    const delFilteredAuthors = param.courseId
      ? paramsAuth.filter((idAuth) => idAuth !== id)
      : author.filter((author) => author.id !== id);
    const authorName = authors.find((author) => author.id === id).name;
    const newAuthor = [
      {
        id: id,
        name: authorName,
      },
    ];
    param.courseId
      ? setParamsAuth([...delFilteredAuthors])
      : setAuthor([...delFilteredAuthors]);
    setAuthorList([...authorList, ...newAuthor]);
  };

  const createCourse = async (e) => {
    e.preventDefault();

    if (!titleValue || !descriptionValue || !durationValue) {
      return alert(`
		    Подтвердите действие на странице localhost:3000
		    Please, fill in all fields`);
    }

    const newCourse = {
      title: titleValue,
      description: descriptionValue,
      creationDate: new Date().toLocaleDateString(),
      duration: +durationValue,
      authors: author.map((aut) => aut.id),
    };
    const postCourse = await ApiServices.saveNewCourse(newCourse);
    if (postCourse.successful) {
      dispatch(getCoursesAll());
      navigate('/courses');
    }
  };

  const courseUpdate = async (e) => {
    e.preventDefault();
    const updateCourseCard = {
      title: titleValue,
      description: descriptionValue,
      creationDate: new Date().toLocaleDateString(),
      duration: +durationValue,
      authors: paramsAuth.map((id) => id),
    };
    console.log('updateCourseCard', updateCourseCard);
    const putRequestUpdateCourse = await ApiServices.updateCourseRequest(
      param.courseId,
      updateCourseCard
    );
    if (putRequestUpdateCourse.successful) {
      dispatch(getCoursesAll());
      navigate('/courses');
    }
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
              inputValue={titleValue}
              onChange={titleChange}
              placeholderText={'Enter title...'}
              required={true}
              minLength={'2'}
            />
          </div>
          <div>
            <Button
              text={param.courseId ? BUTTON_TEXT[8] : BUTTON_TEXT[6]}
              type={'submit'}
              onClick={param.courseId ? courseUpdate : createCourse}
            />
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
          onChange={descriptionChange}
          value={descriptionValue}
          required={true}></textarea>
        <div className="authors-data">
          <section className="authors-adding">
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
          <section className="authors">
            <h2>Authors</h2>
            {authorList.map((author) => {
              keyValue += 1;
              return (
                <div className="authors-list" key={keyValue}>
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
          <section className="course-duration">
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
          <section className="course-authors">
            <h2>Course authors</h2>
            {param.courseId &&
              paramsAuth.map((id) => {
                const authName = authors.find((auth) => auth.id === id).name;
                keyValue += 1;
                return (
                  <div className="authors-list" key={keyValue}>
                    <p key={keyValue}>{authName}</p>
                    <Button
                      text={BUTTON_TEXT[7]}
                      key={id}
                      onClick={deleteAuthor(id)}
                    />
                  </div>
                );
              })}
            {author.map((author) => {
              keyValue += 1;
              return (
                <div className="authors-list" key={keyValue}>
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
