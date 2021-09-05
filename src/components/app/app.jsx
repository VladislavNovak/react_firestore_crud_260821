/* eslint-disable no-console */
import React, {useEffect, useRef, useState} from 'react';
import {Switch, Route, Redirect, NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faCode, faTimes} from '@fortawesome/free-solid-svg-icons';
import {publicRoutes} from '../../utils/routes';
// eslint-disable-next-line no-unused-vars
import {KeyCode, TUTORIALS_ROUTE} from '../../utils/constants';

function App() {
  const [isClicked, setClicked] = useState(false);
  const listRef = useRef(null);

  const handleClick = () => setClicked((prevState) =>!prevState);

  useEffect(() => {
    document.body.addEventListener(`click`, handleOutsideClick);
    document.body.addEventListener(`keydown`, handleOutsideEsc);

    return () => {
      document.body.removeEventListener(`click`, handleOutsideClick);
      document.body.removeEventListener(`keydown`, handleOutsideEsc);
    };
  }, []);

  const handleOutsideEsc = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      setClicked(false);
    }
  };

  const handleOutsideClick = ({path}) => {
    if (!path.includes(listRef.current)) {
      setClicked(false);
    }
  };

  return (
    <div>
      <nav className="navbar" onClick={(evt) => evt.stopPropagation()} >
        <p className="navbar__legend">
          <span>Valdix</span>
          <FontAwesomeIcon icon={faCode} className="navbar__icon" />
        </p>
        <ul className={isClicked ? `navbar__list active` : `navbar__list`} ref={listRef}>
          {publicRoutes.map(({path, title}) => (
            <li key={path} className={isClicked ? `navbar__item active` : `navbar__item`}>
              <NavLink to={path}
                onClick={isClicked ? handleClick : null}
                className={isClicked ? `navbar__link active` : `navbar__link`}
                activeClassName="navbar__link--selected">
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__toggle" onClick={handleClick}>
          <FontAwesomeIcon icon={isClicked ? faBars : faTimes} />
        </div>
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
