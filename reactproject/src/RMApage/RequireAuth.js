import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import { Login } from './Login';

export default function RequireAuth() {
    
    const {auth} = useContext(AuthContext);
    const location = useLocation();
  return (
          
    auth?.user ? <Login />
            : <Navigate to="/" state={{from : location}} replace />
           
  )
}
