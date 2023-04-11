import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import './login.scss';

export const Login = ({ getUserName }) => {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      email: data.email,
      password: data.password,
    };

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    if (result.successful) {
      localStorage.setItem('token', `${result.result}`);
      getUserName(result.user.name);
      navigate('/courses');
    }
  };

  return (
    <section className="login">
      <h1>Login</h1>
      <form onSubmit={userLogin}>
        <div>
          <Input
            labelText={'Email'}
            inputName={'email'}
            inputType={'email'}
            inputValue={data.email}
            placeholderText={'Enter email'}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required={true}
          />
        </div>
        <div>
          <Input
            labelText={'Password'}
            inputName={'password'}
            inputType={'password'}
            inputValue={data.password}
            placeholderText={'Enter password'}
            required={true}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <Button type={'submit'}>Login</Button>
        <p>
          If you not have an account you can{' '}
          <Link to={'/registration'}>Registration</Link>
        </p>
      </form>
    </section>
  );
};

Login.propTypes = {
  getUserName: PropTypes.func,
};
