import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {capFirstLetter} from '../../utils/functions';

const Control = ({inputName, inputData, handleInputChange}) => {
  const [isFocus, setFocus] = useState(false);

  const handleInputFocus = ({target}, status) => {
    if (target.value) {
      status = true;
    }
    setFocus(status);
  };

  return (
    <li className="control" key={inputName} >
      <label className={isFocus ? `control__label active` : `control__label`} htmlFor={inputName}>{capFirstLetter(inputName)}</label>
      <input
        type="text"
        name={inputName}
        id={inputName}
        value={inputData[inputName]}
        onChange={handleInputChange}
        onFocus={(evt) => handleInputFocus(evt, true)}
        onBlur={(evt) => handleInputFocus(evt, false)}
        className="control__control"
        autoComplete="off"
        required />
    </li>
  );
};

Control.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputData: PropTypes.shape({
    description: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default Control;
