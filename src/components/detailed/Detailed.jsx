/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DataService from '../../services/crud-operations';
import {InputNamesList} from '../../utils/constants';
import {extractProperty, capFirstLetter} from '../../utils/functions';

const Detailed = ({selectTask, refreshList}) => {
  const initialState = {
    id: null,
    ...Object.fromEntries(InputNamesList.map((item) => [item, ``])),
    published: false,
  };

  const [inputData, setInputData] = useState(initialState);
  const [message, setMessage] = useState(``);

  useEffect(() => {
    if (!message) {
      return null;
    }

    let timerId = setTimeout(() => {
      setMessage(``);
    }, 5000);

    return () => clearTimeout(timerId);
  }, [message]);

  if (inputData.id !== selectTask.id) {
    setInputData(selectTask);
    setMessage(``);
  }

  const handleInputChange = ({target: {name, value}}) => {
    setInputData({...inputData, [name]: value});
  };

  const updatePublishedStatus = () => {
    let status = !inputData.published;
    DataService.update(inputData.id, {published: status})
      .then(() => {
        setInputData({...inputData, published: status});
        setMessage(`Was updated succesfully!`);
      })
      .catch((error) => {
        console.log(`Error: `, error);
      });
  };

  const updateTask = () => {
    const data = extractProperty(inputData);

    DataService.update(inputData.id, data)
      .then(() => {
        setMessage(`Was updated succesfully!`);
      })
      .catch((error) => {
        console.log(`Error: `, error);
      });
  };

  const deleteTask = () => {
    DataService.remove(inputData.id)
      .then(refreshList)
      .catch((error) => {
        console.log(`Error: `, error);
      });
  };

  const renderForm = () => (
    <div className={inputData.published ? `form detailed published` : `form detailed`}>
      <h4 className="detailed__title">
        <span>Detailed info</span>
      </h4>
      <form>
        {
          InputNamesList.map((inputName) => {
            return (
              <div className="detailed__group" key={inputName} >
                <label className="detailed__label" htmlFor={inputName}><span>{capFirstLetter(inputName)}</span></label>
                <textarea
                  name={inputName}
                  id={inputName}
                  value={inputData[inputName]}
                  onChange={handleInputChange}
                  className={inputData.published ? `detailed__textarea published` : `detailed__textarea`}
                  placeholder="Enter your description"
                  title="Edit and then save changes"
                  required />
              </div>
            );
          })}

        <label className="detailed__distinguish-label">
          <strong>Favourite: </strong>
          <FontAwesomeIcon
            icon={inputData.published ? [`fas`, `heart`] : [`far`, `heart`]}
            className={`detailed__distinguish-icon ${inputData.published && `active`}`} />
          <span>{message}</span>
        </label>
      </form>

      <div className="detailed__buttons">
        <button
          onClick={updatePublishedStatus}
          title="Add task to favourites" >
          <FontAwesomeIcon icon={inputData.published ? [`fas`, `star`] : [`far`, `star`]} />
        </button>

        <button
          onClick={deleteTask}
          title="Delete task">
          <FontAwesomeIcon icon={[`far`, `trash-alt`]} />
        </button>

        <button
          onClick={updateTask}
          title="Update task">
          <FontAwesomeIcon icon={[`far`, `save`]} />
        </button>

      </div>
    </div>
  );

  const renderWarning = () => (
    <p>Please click on a detailed...</p>
  );

  return (inputData ? renderForm() : renderWarning());
};

Detailed.propTypes = {
  selectTask: PropTypes.shape({
    description: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  refreshList: PropTypes.func.isRequired
};

export default Detailed;
