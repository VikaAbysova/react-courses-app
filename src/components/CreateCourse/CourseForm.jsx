import React, { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { generateId } from 'contstants';
import { pipeDuration } from 'helpers/pipeDuration';
import {
  initialState,
  reducerCreateCourse,
} from './common/reducerCreateCourse';
import * as Actions from './common/actionsCreateCourse';
import * as ApiServices from 'store/services';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getCourses } from 'store/selectors';
import { getCoursesAll } from 'store/courses/thunk';
import { getAuthorsAll } from 'store/authors/thunk';
import './courseForm.scss';

export const CourseForm = () => {
  const [state, dispatch] = useReducer(reducerCreateCourse, initialState);
  const authorListServ = useSelector(getAuthors);
  const courses = useSelector(getCourses);
  const [authorList, setAuthorList] = useState(authorListServ);
  const navigate = useNavigate();
  const dispatchStore = useDispatch();
  let keyValue = generateId();

  const param = useParams();
  const updateCourse = courses.find((course) => course.id === param.courseId);
  let authorListParam = param.courseId
    ? authorListServ.filter((author) =>
        updateCourse.authors.every((id) => author.id !== id)
      )
    : [];
  const [paramsAuth, setParamsAuth] = useState(
    param.courseId ? updateCourse.authors : []
  );

  useEffect(() => {
    if (param.courseId) {
      dispatch(Actions.titleChangeAction(updateCourse.title));
      dispatch(Actions.descriptionChangeAction(updateCourse.description));
      dispatch(Actions.durationChangeAction(updateCourse.duration.toString()));
      setAuthorList(authorListParam);
    }
  }, []);

  const createAuthor = async (e) => {
    e.preventDefault();
    if (state.nameValue.length >= 2) {
      const authorCreated = {
        name: state.nameValue,
      };
      const postAuthor = await ApiServices.saveNewAuthor(authorCreated);
      if (postAuthor.successful) {
        dispatchStore(getAuthorsAll());
      }
      const newAuthor = { name: state.nameValue, id: postAuthor.result.id };

      if (!authorList.find((el) => el.id === newAuthor.id)) {
        setAuthorList([...authorList, { ...newAuthor }]);
      }
      dispatch(Actions.nameChangeAction(''));
    }
  };

  const addAuthor = (id) => (e) => {
    e.preventDefault();
    const authorName = authorListServ.find((author) => author.id === id).name;
    const newAuthor = {
      id: id,
      name: authorName,
    };
    const filteredAuthors = authorList.filter(
      (author) => author.id !== newAuthor.id
    );
    param.courseId
      ? setParamsAuth([...paramsAuth, id])
      : dispatch(Actions.increaseAuthorAction(newAuthor));
    setAuthorList([...filteredAuthors]);
  };

  const deleteAuthor = (id) => (e) => {
    e.preventDefault();
    const authorName = authorListServ.find((author) => author.id === id).name;
    const changeAuthor = {
      id: id,
      name: authorName,
    };
    const delFilteredAuthors = param.courseId
      ? paramsAuth.filter((idAuth) => idAuth !== id)
      : state.author.filter((author) => author.id !== id);
    param.courseId
      ? setParamsAuth([...delFilteredAuthors])
      : dispatch(Actions.decreaseAuthorAction(delFilteredAuthors));
    setAuthorList([...authorList, changeAuthor]);
  };

  const createCourse = async (e) => {
    e.preventDefault();
    if (!state.titleValue || !state.descriptionValue || !state.durationValue) {
      return alert(`
		  Подтвердите действие на странице localhost:3000
		  Please, fill in all fields`);
    }
    const newCourse = {
      title: state.titleValue,
      description: state.descriptionValue,
      creationDate: new Date().toLocaleDateString(),
      duration: +state.durationValue,
      authors: state.author.map((aut) => aut.id),
    };
    const postCourse = await ApiServices.saveNewCourse(newCourse);
    if (postCourse.successful) {
      dispatchStore(getCoursesAll());
      navigate('/courses');
    }
  };

  const courseUpdate = async (e) => {
    e.preventDefault();
    const updateCourseCard = {
      title: state.titleValue,
      description: state.descriptionValue,
      duration: +state.durationValue,
      authors: paramsAuth.map((id) => id),
    };
    const updateCourse = await ApiServices.updateCourseRequest(
      param.courseId,
      updateCourseCard
    );
    if (updateCourse.successful) {
      dispatchStore(getCoursesAll());
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
              inputValue={state.titleValue}
              onChange={(e) =>
                dispatch(Actions.titleChangeAction(e.target.value))
              }
              placeholderText={'Enter title...'}
              required={true}
              minLength={'2'}
            />
          </div>
          <div>
            <Button
              type={'submit'}
              onClick={param.courseId ? courseUpdate : createCourse}>
              {param.courseId ? 'Update course' : 'Create course'}
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
          onChange={(e) =>
            dispatch(Actions.descriptionChangeAction(e.target.value))
          }
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
              onChange={(e) =>
                dispatch(Actions.nameChangeAction(e.target.value))
              }
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
            {authorList.map((author) => {
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
              onChange={(e) =>
                dispatch(Actions.durationChangeAction(e.target.value))
              }
              required={true}
              min={1}
            />
            <p className="duration-info">
              Duration: <span>{pipeDuration(state.durationValue)}</span> hours
            </p>
          </section>
          <section className="course-authors">
            <h2>Course authors</h2>
            {param.courseId &&
              paramsAuth.map((id) => {
                const authName = authorListServ.find(
                  (auth) => auth.id === id
                ).name;
                keyValue += 1;
                return (
                  <div className="authors-list" key={keyValue}>
                    <p key={keyValue}>{authName}</p>
                    <Button key={id} onClick={deleteAuthor(id)}>
                      Delete author
                    </Button>
                  </div>
                );
              })}
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
