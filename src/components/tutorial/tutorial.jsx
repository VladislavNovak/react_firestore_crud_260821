/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import DataService from '../../services/data-service';
import {Controls} from '../../utils/constants';
import {extractProperty} from '../../utils/functions';

const Tutorial = ({currentTutorial, refreshList}) => {
  const initialTutorialState = {
    id: null,
    ...Object.fromEntries(Controls.map((item) => [item, ``])),
    published: false,
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState(``);

  if (tutorial.id !== currentTutorial.id) {
    setTutorial(currentTutorial);
    setMessage(``);
  }

  const handleInputChange = ({target: {name, value}}) => {
    setTutorial({...tutorial, [name]: value});
  };

  const updatePublishedStatus = (status) => {
    DataService.update(tutorial.id, {published: status})
      .then(() => {
        setTutorial({...tutorial, published: status});
        setMessage(`The status was updated successfully!`);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error: `, error);
      });
  };

  const updateTutorial = () => {
    const data = extractProperty(tutorial);

    DataService.update(tutorial.id, data)
      .then(() => {
        setMessage(`The status was updated successfully!`);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error: `, error);
      });
  };

  const deleteTutorial = () => {
    DataService.remove(tutorial.id)
      .then(refreshList)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error: `, error);
      });
  };

  const renderForm = () => (
    <div className="edit-form">
      <h4>Tutorial</h4>
      <form>
        {
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

        <div className="form-group">
          <label>
            <strong>Status</strong>
          </label>
          {tutorial.published ? `published` : `pending`}
        </div>
      </form>

      <button
        className="btn btn-primary m-1"
        onClick={() =>updatePublishedStatus(!tutorial.published)} >
        {tutorial.published ? `UnPublish` : `Publish`}
      </button>

      <button onClick={deleteTutorial} className="btn btn-danger m-1">Delete</button>

      <button onClick={updateTutorial} className="btn btn-success m-1">Update</button>
      <p>{message}</p>
    </div>
  );

  const renderWarning = () => (
    <div>
      <br />
      <p>Please click on a Tutorial...</p>
    </div>
  );

  return (
    <div>
      {tutorial ? renderForm() : renderWarning()}
    </div>
  );
};

export default Tutorial;
