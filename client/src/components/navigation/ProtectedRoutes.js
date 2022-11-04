import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = ({authenticated}) => {

    if (!authenticated) {return <Navigate to="/" replace/>}
    
    return <Outlet/>
}

export default ProtectedRoutes