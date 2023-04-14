import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "./AuthContext";


const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
}
export default ProtectedRoute;
