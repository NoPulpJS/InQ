import React, { Component } from 'react';
import {
  Switch, Route, Router, Link, useLocation,
} from 'react-router-dom';
import PersistentDrawer from './components/PersistentDrawer';
import MessageBoard from './components/MessageBoard';

// import MainContainer from './components/MainContainer';
import Login from './components/Login';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="router">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/profile">
            <PersistentDrawer />
          </Route>
        </Switch>
      </div>

    );
  }
}

export default App;
