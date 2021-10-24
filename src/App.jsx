import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {publicRoutes} from './routes/routes';
import {TASKLIST_ROUTE} from './routes/constants';
import {Navbar} from './components';

import './utils/fontawesome.js';

function App() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <Switch>
          {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact />)}
          <Redirect to={TASKLIST_ROUTE} />
        </Switch>
      </div>
    </div>

  );
}

export default App;
