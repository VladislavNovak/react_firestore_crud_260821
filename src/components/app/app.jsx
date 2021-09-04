import React from 'react';
import {Switch, Route, Redirect, NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import {publicRoutes} from '../../utils/routes';
import {TUTORIALS_ROUTE} from '../../utils/constants';

function App() {
  return (
    <div>
      <nav id="navbar">
        <ul>
          <li>
            <p>Valdix <FontAwesomeIcon icon={faCode} className="navbar__logo" /></p>
          </li>
          {publicRoutes.map(({path, title}) => (
            <li key={path}>
              <NavLink to={path}
                className="navbar__link"
                activeClassName="navbar__link--selected">
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

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
