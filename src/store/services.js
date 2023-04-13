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

export const registrationRequestServer = async (newUser) => {
  const response = await fetch('http://localhost:4000/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
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
