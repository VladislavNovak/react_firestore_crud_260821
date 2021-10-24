import {TUTORIALS_ROUTE, ADD_ROUTE, MORE_ROUTE} from './constants';
import AddTask from '../pages/add-task/Add-task';
import More from '../pages/more/More';
import TaskList from '../pages/task-list/Task-list';

export const publicRoutes = [
  {
    title: `Add Task`,
    path: ADD_ROUTE,
    Component: AddTask
  },
  {
    title: `Task List`,
    path: TUTORIALS_ROUTE,
    Component: TaskList
  },
  {
    title: `More`,
    path: MORE_ROUTE,
    Component: More
  }
];
