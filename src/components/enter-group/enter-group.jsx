import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {capFirstLetter} from '../../utils/functions';

// ---------------------------------------------------------------

const EnterGroup = ({control, tutorial, handleInputChange}) => {
  const [isFocus, setFocus] = useState(false);

  const handleInputFocus = ({target}, status) => {
    if (target.value) {
      status = true;
    }
    setFocus(status);
  };

  return (
    <div className="enter-group" key={control} >
      <label className={isFocus ? `enter-group__label active` : `enter-group__label`} htmlFor={control}>{capFirstLetter(control)}</label>
      <input
        type="text"
        name={control}
        id={control}
        value={tutorial[control]}
        onChange={handleInputChange}
        onFocus={(evt) => handleInputFocus(evt, true)}
        onBlur={(evt) => handleInputFocus(evt, false)}
        className="enter-group__control"
        autoComplete="off"
        required />
    </div>
  );
};

EnterGroup.propTypes = {
  control: PropTypes.string.isRequired,
  tutorial: PropTypes.shape({
    description: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default EnterGroup;
