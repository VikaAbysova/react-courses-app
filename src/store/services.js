export const loginRequest = async (credentials) => {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
};

export const getCoursesRequest = async () => {
  const response = await fetch('http://localhost:4000/courses/all');
  const result = await response.json();
  return result;
};

export const getAuthorsRequest = async () => {
  const response = await fetch('http://localhost:4000/authors/all');
  const result = await response.json();
  return result;
};

export const logoutRequest = async () => {
  const url = 'http://localhost:4000/logout';
  const setHeaders = {
    method: 'DELETE',
    headers: {
      Authorization: localStorage.token,
    },
  };
  const res = await fetch(url, setHeaders);
  return res;
};

export const saveNewCourse = async (newCourse) => {
  const url = 'http://localhost:4000/courses/add';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newCourse),
    headers: {
      Authorization: localStorage.token,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log('result adding course', result);
  return result;
};

export const saveNewAuthor = async (newAuthor) => {
  const url = 'http://localhost:4000/authors/add';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newAuthor),
    headers: {
      Authorization: localStorage.token,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log('result adding author', result);
  return result;
};

export const deleteCourse = async (id) => {
  const url = `http://localhost:4000/courses/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    // body: JSON.stringify(newAuthor),
    headers: {
      Authorization: localStorage.token,
    },
  });
  const result = await response.json();
  console.log('deleted course', result);
  return result;
};