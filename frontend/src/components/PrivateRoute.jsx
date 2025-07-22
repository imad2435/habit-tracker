import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // In a real app, you might also check a loading state here
  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;