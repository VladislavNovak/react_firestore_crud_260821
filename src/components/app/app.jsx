import React from 'react';
import {Switch, Route, Link, Redirect} from "react-router-dom";
import {publicRoutes} from '../../utils/routes';
import {TUTORIALS_ROUTE} from '../../utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="" className="navbar-brand">Valdix</a>
        <div className="navbar-nav mr-auto">
          {publicRoutes.map(({path, title}) => (
            <li key={path} className="nav-item">
              <Link to={path} className="nav-link">{title}</Link>
            </li>
          ))}
        </div>
      </nav>

      <div className="container mt-3">
        <h2>React Hooks Firestore example</h2>
        <Switch>
          {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact />)}
          <Redirect to={TUTORIALS_ROUTE} />
        </Switch>
      </div>
    </div>

  );
}

export default App;
