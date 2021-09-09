import React, {useEffect, useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {publicRoutes} from '../../utils/routes';
import {KeyCode} from '../../utils/constants';

// ----------------------------------------------------------------------

const Navbar = () => {
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
    <nav className="navbar" onClick={(evt) => evt.stopPropagation()} >
      <p className="navbar__legend">
        <span>Valdix</span>
        <FontAwesomeIcon icon="code" className="navbar__icon" />
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
        <FontAwesomeIcon icon={isClicked ? `times` : `bars`} />
      </div>
    </nav>
  );
};

export default Navbar;
