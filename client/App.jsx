import React, { Component } from 'react';
import {
  Switch, Route, Router, Link, useLocation,
} from 'react-router-dom';
import PersistentDrawer from './components/PersistentDrawer';

import MainContainer from './components/MainContainer';
import Login from './components/Login'
// Add router for login
// Add router to DrawerLeft

class App extends Component {
  render() {
    return (
      <div className = 'router'>
        <Switch>
          <Route exact path="/" >
            <Login />
          </Route>
        <Route exact path= "/profile">
            <PersistentDrawer />
        </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
