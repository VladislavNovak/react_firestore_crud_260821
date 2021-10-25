import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useCollection} from "react-firebase-hooks/firestore";
import DataService from '../../services/crud-operations.js';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {Detailed} from '../../components';

const Tasks = () => {
  const [selectTask, setSelectTask] = useState(null);
  const [selectIndex, setSelectIndex] = useState(-1);

  const [tasks, loading, error] = useCollection(DataService.getAll().orderBy(`title`, `asc`));

  const handleClick = (task, index) => {
    const {title, description, published} = task.data();
    setSelectTask({id: task.id, title, description, published});
    setSelectIndex(index);
  };

  const refreshList = () => {
    setSelectTask(null);
    setSelectIndex(-1);
  };

  const renderTaskList = () => (
    <ul className="tasks__list">
      { !loading && tasks && tasks.docs.map((task, index) => (
        <li
          key={task.id}
          onClick={() => handleClick(task, index)}
          className={`item-like-button tasks__item ` + (index === selectIndex ? `tasks__item--active` : ``)}>
          {task.data().title}
        </li>
      ))}
    </ul>
  );

  const renderTaskListFalse = (arg) => (
    <div className ="tasks__notexist">{arg}</div>
  );

  const renderSelectTask = () => (
    <Detailed selectTask={selectTask} refreshList={refreshList} />
  );

  const renderSelectTaskFalse = () => (
    <div className="tasks__warning">
      <span>Please click on a Task...</span>
      <FontAwesomeIcon icon={faShare} className="tasks__warning-icon fa-rotate-180" />
    </div>
  );

  return (
    <div className="form tasks">
      <h1 className="tasks__title">Saved <span>TASK</span> list</h1>
      <div className="tasks__list-wrap">
        {error && <strong>Error: {error}</strong>}
        {loading && renderTaskListFalse(`Loading...`)}
        {tasks && tasks.docs.length ? renderTaskList() : renderTaskListFalse(`Create a new entry!`)}
      </div>
      {selectTask ? renderSelectTask() : renderSelectTaskFalse()}
    </div>
  );
};

export default Tasks;
