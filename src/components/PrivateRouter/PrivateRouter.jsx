import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../../store/selectors';
import { currentUser } from '../../store/user/thunk';
import { useEffect } from 'react';

const PrivateRouter = () => {
  const user = useSelector(getUser);
  // const dispatch = useDispatch();
  // const callCurrentUser = () => {
  //   dispatch(currentUser());
  // };

  // useEffect(() => {
  //   callCurrentUser();
  // }, [user.isAuth]);

  return user.role === 'admin' ? <Outlet /> : <Navigate to="/courses" />;
};

PrivateRouter.propsTypes = {
  role: PropTypes.string,
};

export default PrivateRouter;
