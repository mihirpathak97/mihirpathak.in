import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

// Import views
import Home from './views/home';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
      </Switch>
    );
  }
}

export default Routes;