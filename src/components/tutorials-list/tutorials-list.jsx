import React, {useState} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import DataService from '../../services/data-service.js';
import Tutorial from '../tutorial/tutorial.jsx';

const TutorialsList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [tutorials, loading, error] = useCollection(DataService.getAll().orderBy(`title`, `asc`));

  const setActiveTutorial = (tutorial, index) => {
    const {title, description, published} = tutorial.data();
    setCurrentTutorial({id: tutorial.id, title, description, published});
    setCurrentIndex(index);
  };

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const renderIfCurrentTutorialTrue = () => (
    <Tutorial currentTutorial={currentTutorial} refreshList={refreshList} />
  );

  const renderIfCurrentTutorialFalse = () => (
    <div>
      <br />
      <p>Please click on a Tutorial...</p>
    </div>
  );

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tutorial List</h4>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="list-group">
          { !loading && tutorials && tutorials.docs.map((tutorial, index) => (
            <li
              key={tutorial.id}
              onClick={() => setActiveTutorial(tutorial, index)}
              className={`list-group-item ` + (index === currentIndex ? `active` : ``)}>
              {tutorial.data().title}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTutorial ? renderIfCurrentTutorialTrue() : renderIfCurrentTutorialFalse()}
      </div>
    </div>
  );
};

export default TutorialsList;
