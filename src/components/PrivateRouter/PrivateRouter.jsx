import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { getUser } from 'store/selectors';

const PrivateRouter = () => {
  const user = useSelector(getUser);
  return user.role === 'admin' ? <Outlet /> : <Navigate to="/courses" />;
};

export default PrivateRouter;
