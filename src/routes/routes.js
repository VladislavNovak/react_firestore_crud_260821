import {TASKS_ROUTE, ADD_ROUTE, MORE_ROUTE} from './constants';
import {AddTask, More, Tasks} from '../pages';

export const publicRoutes = [
  {
    title: `Add Task`,
    path: ADD_ROUTE,
    Component: AddTask
  },
  {
    title: `Task List`,
    path: TASKS_ROUTE,
    Component: Tasks
  },
  {
    title: `More`,
    path: MORE_ROUTE,
    Component: More
  }
];
