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
