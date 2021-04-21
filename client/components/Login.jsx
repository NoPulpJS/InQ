import React, { Component } from 'react';
import Typed from 'react-typed';
import {
  Switch, Route, Router, Link, useLocation,
} from 'react-router-dom';

function Login(props) {
  const oAuthURL = '';

  return (
    <div className="oAuth">
      <a href={`${oAuthURL}`} />
    </div>
  );
}
export default Login;
