/* eslint-disable no-console */
import React, {useState} from 'react';
import {EnterGroup} from '../../components';
import DataService from '../../services/data-service';
import {Controls} from '../../utils/constants';

const AddTask = () => {

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
    <div className="add-task__warning">
      <p>The task was <span>successfully saved</span> on the server!</p>
      <button onClick={newTutorial} className="add-task__btns">Create next</button>
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

      <button
        onClick={saveTutorial}
        disabled={!tutorial.title && !tutorial.description}
        className="add-task__btns">
          Save
      </button>
    </div>
  );

  return (
    <div className="form add-task">
      <h1 className="add-task__title">Add <span>NEW</span> task</h1>
      {submitted ? renderIfSubmittedTrue() : renderIfSubmittedFalse()}
    </div>
  );
};

export default AddTask;
