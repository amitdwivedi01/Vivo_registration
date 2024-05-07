import React from 'react';
import { Route, Navigate as Redirect } from 'react-router-dom';

const Private = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default Private;
