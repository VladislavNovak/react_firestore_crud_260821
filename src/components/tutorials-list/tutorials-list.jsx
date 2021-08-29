import React, {useState, useEffect} from 'react';
import DataService from '../../services/data-service.js';
import {arrangeObjectProperties} from '../../utils/functions.js';
import Tutorial from '../tutorial/tutorial.jsx';

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onDataChange = (items) => {
    const temp = [];

    items.docs.forEach((item) => {
      const ordered = arrangeObjectProperties(item);
      temp.push({id: item.id, ...ordered});
    });

    setTutorials(temp);
  };

  useEffect(() => {
    const unsubscribe = DataService.getAll().orderBy(`title`, `asc`).onSnapshot(onDataChange);
    return unsubscribe;
  }, []);

  const setActiveTutorial = ({id, title, description, published}, index) => {
    setCurrentTutorial({id, title, description, published});
    setCurrentIndex(index);
  };

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const renderIfCurrentTutorialTrue = () => (
    <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
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
        <ul className="list-group">
          {tutorials && tutorials.map((tutorial, index) => (
            <li
              key={tutorial.id}
              onClick={() => setActiveTutorial(tutorial, index)}
              className={`list-group-item ` + (index === currentIndex ? `active` : ``)}>
              {tutorial.title}
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
