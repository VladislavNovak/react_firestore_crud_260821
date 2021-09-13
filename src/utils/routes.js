import {TUTORIALS_ROUTE, ADD_ROUTE, MORE_ROUTE} from './constants';
import Appendor from '../components/appendor/appendor';
import More from '../components/more/more';
import Tasks from '../components/tasks/tasks';

export const publicRoutes = [
  {
    title: `Add`,
    path: ADD_ROUTE,
    Component: Appendor
  },
  {
    title: `List`,
    path: TUTORIALS_ROUTE,
    Component: Tasks
  },
  {
    title: `More`,
    path: MORE_ROUTE,
    Component: More
  }
];
