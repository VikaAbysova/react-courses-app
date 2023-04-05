import './login.scss';

import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';

import * as ApiServices from '../../store/services';
import { useDispatch } from 'react-redux';
import { userLoginAction } from '../../store/user/actionCreators';
import { currentUser } from '../../store/user/thunk';

export const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      email: data.email,
      password: data.password,
    };
    const result = await ApiServices.loginRequest(credentials);

    if (result.successful) {
      const user = {
        isAuth: true,
        name: result.user.name,
        email: result.user.email,
        token: result.result,
      };
      localStorage.setItem('token', `${result.result}`);
      dispatch(userLoginAction(user));
      dispatch(currentUser());
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
        <Button text={'Login'} type={'submit'} />
        <p>
          If you not have an account you can{' '}
          <Link to={'/registration'}>Registration</Link>
        </p>
      </form>
    </section>
  );
};
