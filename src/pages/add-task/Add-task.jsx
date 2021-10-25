/* eslint-disable no-console */
import React, {Fragment, useState} from 'react';
import {Control} from '../../components';
import DataService from '../../services/crud-operations';
import {InputNamesList} from '../../utils/constants';

const AddTask = () => {

  const initialState = {
    ...Object.fromEntries(InputNamesList.map((inputName) => [inputName, ``])),
    published: false,
  };

  const [submitted, setSubmitted] = useState(false);
  const [inputData, setInputData] = useState(initialState);

  const handleInputChange = ({target: {name, value}}) => {
    setInputData({...inputData, [name]: value});
  };

  const saveInputData = () => {
    const data = {...inputData, published: false};

    DataService.create(data)
    .then(() => {
      setSubmitted(true);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(`Error: `, error);
    });
  };

  const newInputData = () => {
    setInputData(initialState);
    setSubmitted(false);
  };

  const renderIfSubmittedTrue = () => (
    <div className="add-task__warning">
      <p>The task was <span>successfully saved</span> on the server!</p>
      <button onClick={newInputData} className="add-task__btns">Create next</button>
    </div>
  );

  const renderIfSubmittedFalse = () => (
    <Fragment>
      <ul>
        {InputNamesList.map((inputName) => (
          <Control
            key={inputName}
            inputName={inputName}
            inputData={inputData}
            handleInputChange={handleInputChange} />
        ))}
      </ul>

      <button
        onClick={saveInputData}
        disabled={!inputData.title && !inputData.description}
        className="add-task__btns">
          Save
      </button>
    </Fragment>
  );

  return (
    <div className="form add-task">
      <h1 className="add-task__title">Add <span>NEW</span> task</h1>
      {submitted ? renderIfSubmittedTrue() : renderIfSubmittedFalse()}
    </div>
  );
};

export default AddTask;
