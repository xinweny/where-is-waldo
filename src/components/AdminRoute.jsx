import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ isAdmin, children }) {
  return isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;
