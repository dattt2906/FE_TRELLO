import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useToken } from './tokenContext';

const PrivateRoute = () => {
  const token = sessionStorage.getItem('Token_User');
  return token ? <Outlet /> : <Navigate to="/" />; //middleware để kiểm tra nếu có token thì cho truy cập router chỉ định, không có token về login
};

export default PrivateRoute;