import './header.scss';

import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import { BUTTON_TEXT } from '../../contstants';

export const Header = ({ userName }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.token);
  const showLogoutBtn =
    location.pathname.includes('login') ||
    location.pathname.includes('registration');

  const logout = () => {
    if (localStorage.token) {
      localStorage.removeItem('token');
      setToken('');
      navigate('login');
    }
  };

  useEffect(() => {
    !localStorage.token ? navigate('login') : navigate('courses');
  }, [token]);

  return (
    <>
      <header className="header">
        <Logo />
        <div>
          {localStorage.token && <p>{userName}</p>}
          {!showLogoutBtn && (
            <Button type="button" text={BUTTON_TEXT[0]} onClick={logout} />
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
};
