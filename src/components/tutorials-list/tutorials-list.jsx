import React, {useState} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import DataService from '../../services/data-service.js';
import Detail from '../detail/detail.jsx';

// ----------------------------------------------------------------------------------

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
    <Detail currentTutorial={currentTutorial} refreshList={refreshList} />
  );

  const renderIfCurrentTutorialFalse = () => (
    <p className="affairs__warning">Please click on a Task...</p>
  );

  return (
    <div className="affairs">
      <h1 className="affairs__title">Saved <span>TASK</span> list
      </h1>
      <div className="affairs__list-wrap">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="affairs__list">
          { !loading && tutorials && tutorials.docs.map((tutorial, index) => (
            <li
              key={tutorial.id}
              onClick={() => setActiveTutorial(tutorial, index)}
              className={`affairs__item ` + (index === currentIndex ? `active` : ``)}>
              {tutorial.data().title}
            </li>
          ))}
        </ul>
      </div>
      <div className="affairs__details">
        {currentTutorial ? renderIfCurrentTutorialTrue() : renderIfCurrentTutorialFalse()}
      </div>
    </div>
  );
};

export default TutorialsList;
