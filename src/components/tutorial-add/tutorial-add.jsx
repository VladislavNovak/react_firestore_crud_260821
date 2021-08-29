import React, {useState} from 'react';
import DataService from '../../services/data-service';
import {Controls} from '../../utils/constants';

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
      <h4>You submitted successfully!</h4>
      <button onClick={newTutorial} className="btn btn-success">Add</button>
    </div>
  );

  const renderIfSubmittedFalse = () => (
    <div>{
      Controls.map((control) => {
        return (
          <div className="form-group" key={control} >
            <label htmlFor={control}>{control}</label>
            <input
              type="text"
              name={control}
              id={control}
              value={tutorial[control]}
              onChange={handleInputChange}
              className="form-control"
              required />
          </div>
        );
      })}

    <button onClick={saveTutorial} className="btn btn-success mt-3">Submit</button>
    </div>
  );

  return (
    <div className="submit-form">
      {submitted ? renderIfSubmittedTrue() : renderIfSubmittedFalse()}
    </div>
  );
};

export default TutorialAdd;
