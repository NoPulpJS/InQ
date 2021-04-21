import React, { Component } from 'react';
import {
  Switch, Route, Router, Link, useLocation,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';

function Login(props) {
  const oAuthURL = '/login/OAuth/';

  return (

    <div className="oAuth">
      <a href={`${oAuthURL}`}>
      <Button variant="contained">Login</Button>
     </a>
    </div>
  );
}
export default Login;
