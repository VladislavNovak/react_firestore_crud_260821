import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import DataService from '../../services/data-service';
import {Controls} from '../../utils/constants';
import {extractProperty, capFirstLetter} from '../../utils/functions';

// -----------------------------------------------------------------------------

const Detail = ({currentTutorial, refreshList}) => {
  const initialTutorialState = {
    id: null,
    ...Object.fromEntries(Controls.map((item) => [item, ``])),
    published: false,
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState(``);

  useEffect(() => {
    if (!message) {
      return;
    }

    let timerId = setTimeout(() => {
      setMessage(``);
    }, 5000);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerId);
  }, [message]);

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
        setMessage(`Was updated succesfully!`);
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
        setMessage(`Was updated succesfully!`);
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
    <div className={tutorial.published ? `form detail published` : `form detail`}>
      <h4 className="detail__title">
        <span>Detailed info</span>
      </h4>
      <form>
        {
          Controls.map((control) => {
            return (
              <div className="detail__group" key={control} >
                <label
                  className="detail__label"
                  htmlFor={control}>
                  <span>{capFirstLetter(control)}</span>
                </label>
                <textarea
                  name={control}
                  id={control}
                  className="detail__textarea"
                  value={tutorial[control]}
                  onChange={handleInputChange}
                  placeholder="Enter your description"
                  required />
              </div>
            );
          })}

        <label className="detail__distinguish-label">
          <strong>Favourite: </strong>
          <FontAwesomeIcon
            icon={tutorial.published ? [`fas`, `heart`] : [`far`, `heart`]}
            className={`detail__distinguish-icon ${tutorial.published && `active`}`} />
          <span>{message}</span>
        </label>
      </form>

      <div className="detail__buttons">
        <button
          className="detail__buttons-btns"
          onClick={() =>updatePublishedStatus(!tutorial.published)}
          title="Add to favourites" >
          <FontAwesomeIcon icon={tutorial.published ? [`fas`, `star`] : [`far`, `star`]} />
        </button>

        <button onClick={deleteTutorial} className="detail__buttons-btns" title="Delete task">
          <FontAwesomeIcon icon={[`far`, `trash-alt`]} />
        </button>

        <button onClick={updateTutorial} className="detail__buttons-btns" title="Update task">
          <FontAwesomeIcon icon={[`far`, `save`]} />
        </button>

      </div>
    </div>
  );

  const renderWarning = () => (
    <p>Please click on a Detail...</p>
  );

  return (
    <>
      {tutorial ? renderForm() : renderWarning()}
    </>
  );
};

Detail.propTypes = {
  currentTutorial: PropTypes.shape({
    description: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  refreshList: PropTypes.func.isRequired
};

export default Detail;
