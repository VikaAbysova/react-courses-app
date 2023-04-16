import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'common/Button/Button';
import { Input } from 'common/Input/Input';
import * as ApiServices from 'store/services';
import './registration.scss';

export const Registration = () => {
  const [data, setData] = useState({ userName: '', email: '', password: '' });
  const navigate = useNavigate();

  const registrationRequest = async (e) => {
    e.preventDefault();
    const newUser = {
      name: data.userName,
      email: data.email,
      password: data.password,
    };
    const result = await ApiServices.registrationRequestServer(newUser);
    if (result.successful) {
      navigate('/login');
    }
  };
  return (
    <section className="registration">
      <h1>Registration</h1>
      <form onSubmit={registrationRequest}>
        <div>
          <Input
            labelText={'Name'}
            inputName={'name'}
            inputType={'text'}
            inputValue={data.userName}
            placeholderText={'Enter name'}
            required={true}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
          />
        </div>
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
        <Button type={'submit'}>Registration</Button>
        <p>
          If you have an account you can <Link to={'/login'}>Login</Link>
        </p>
      </form>
    </section>
  );
};
