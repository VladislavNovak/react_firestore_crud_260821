import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {publicRoutes} from '../../utils/routes';
import {TUTORIALS_ROUTE} from '../../utils/constants';
import {Navbar} from '..';

import '../../utils/fontawesome.js';

function App() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <Switch>
          {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact />)}
          <Redirect to={TUTORIALS_ROUTE} />
        </Switch>
      </div>
    </div>

  );
}

export default App;
