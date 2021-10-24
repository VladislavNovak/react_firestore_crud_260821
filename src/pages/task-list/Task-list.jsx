import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useCollection} from "react-firebase-hooks/firestore";
import DataService from '../../services/data-service.js';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {Detail} from '../../components';

// ----------------------------------------------------------------------------------

const Tasks = () => {
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

  const renderIfTutorialsExist = () => (
    <ul className="task-list__list">
      { !loading && tutorials && tutorials.docs.map((tutorial, index) => (
        <li
          key={tutorial.id}
          onClick={() => setActiveTutorial(tutorial, index)}
          className={`item-like-button task-list__item ` + (index === currentIndex ? `task-list__item--active` : ``)}>
          {tutorial.data().title}
        </li>
      ))}
    </ul>
  );

  const renderIfTutorialsNotExist = (arg) => (
    <div className ="task-list__notexist">{arg}</div>
  );

  const renderIfCurrentTutorialTrue = () => (
    <Detail currentTutorial={currentTutorial} refreshList={refreshList} />
  );

  const renderIfCurrentTutorialFalse = () => (
    <div className="task-list__warning">
      <span>Please click on a Task...</span>
      <FontAwesomeIcon icon={faShare} className="task-list__warning-icon fa-rotate-180" />
    </div>
  );

  return (
    <div className="form task-list">
      <h1 className="task-list__title">Saved <span>TASK</span> list</h1>
      <div className="task-list__list-wrap">
        {error && <strong>Error: {error}</strong>}
        {loading && renderIfTutorialsNotExist(`Loading...`)}
        {tutorials && tutorials.docs.length ? renderIfTutorialsExist() : renderIfTutorialsNotExist(`Create a new entry!`)}
      </div>
      {currentTutorial ? renderIfCurrentTutorialTrue() : renderIfCurrentTutorialFalse()}
    </div>
  );
};

export default Tasks;
