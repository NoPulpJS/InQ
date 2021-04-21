import React, { Component } from 'react';
import {
  Switch, Route, Router, Link, useLocation,
} from 'react-router-dom';
import DrawerLeft from './components/PersistentDrawer';

import SearchContainer from './components/MainContainer';
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <>
      {/* <DrawerLeft /> */}
      <Login />
      </>
    );
  }
}

export default App;
