import React, {useState} from 'react';
import {EnterGroup} from '..';
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
      <p className="form__warning">The task was <span>successfully saved</span> on the server!</p>
      <button onClick={newTutorial} className="form__btn-add">create next</button>
    </div>
  );

  const renderIfSubmittedFalse = () => (
    <div>
      {Controls.map((control) => (
        <EnterGroup
          key={control}
          control={control}
          tutorial={tutorial}
          handleInputChange={handleInputChange} />
      ))}

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
