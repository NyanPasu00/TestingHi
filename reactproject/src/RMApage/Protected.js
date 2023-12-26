import React from 'react'
import { UserAuth } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom';

export default function Protected({children}) {

    const {user} = UserAuth();

    if(!user) {
        return <Navigate to='/'/>;
     }

     return children;
      
}

