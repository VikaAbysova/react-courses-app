import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from 'store/user/actionCreators';
import { getUser } from 'store/selectors';
import * as ApiServices from 'store/services';
import './header.scss';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(getUser).name;

  const [token, setToken] = useState(localStorage.token);
  const showLogoutBtn =
    location.pathname.includes('login') ||
    location.pathname.includes('registration');

  const logout = () => {
    if (localStorage.token) {
      dispatch(userLogoutAction());
      ApiServices.logoutRequest();
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
        <div className="header-body">
          <p data-testid="user-name" className="user-name">
            {userName}
          </p>

          {!showLogoutBtn && (
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
};
