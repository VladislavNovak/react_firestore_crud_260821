import React, {useState} from 'react';
import DataService from '../../services/data-service';
import {Controls} from '../../utils/constants';
import {capFirstLetter} from '../../utils/functions';

const TutorialAdd = () => {

  const initialTutorialState = {
    ...Object.fromEntries(Controls.map((item) => [item, ``])),
    published: false,
  };

  const [submitted, setSubmitted] = useState(false);
  const [tutorial, setTutorial] = useState(initialTutorialState);

  const handleInputChange = ({target: {name, value}}) => {
    setTutorial({...tutorial, [name]: value});
  };

  const saveTutorial = () => {
    const data = {...tutorial, published: false};

    DataService.create(data)
    .then(() => {
      setSubmitted(true);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(`Error: `, error);
    });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  const renderIfSubmittedTrue = () => (
    <div>
      <p className="form__warning">The task was <span>successfully saved</span> on the server!</p>
      <button onClick={newTutorial} className="form__btn-add">create next</button>
    </div>
  );

  const renderIfSubmittedFalse = () => (
    <div>{
      Controls.map((control) => {
        return (
          <div className="form__group" key={control} >
            <label className="form__label" htmlFor={control}>{capFirstLetter(control)}</label>
            <input
              type="text"
              name={control}
              id={control}
              value={tutorial[control]}
              onChange={handleInputChange}
              className="form__control"
              autoComplete="off"
              required />
          </div>
        );
      })}

    <button onClick={saveTutorial} className="form__btn-save">Save</button>
    </div>
  );

  return (
    <div className="submit-form">
      <h1 className="submit-form__title">Add <span>NEW</span> task</h1>
      {submitted ? renderIfSubmittedTrue() : renderIfSubmittedFalse()}
    </div>
  );
};

export default TutorialAdd;
