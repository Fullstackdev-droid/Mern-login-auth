import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const authStatus = () => {
    if (localStorage.getItem('jwtToken')) {
        return true;
    }
    return false;
}


const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authStatus() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;