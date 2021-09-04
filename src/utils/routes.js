import {TUTORIALS_ROUTE, ADD_ROUTE, MORE_ROUTE} from './constants';
import TutorialAdd from '../components/tutorial-add/tutorial-add';
import More from '../components/more/more';
import TutorialsList from '../components/tutorials-list/tutorials-list';

export const publicRoutes = [
  {
    title: `Add`,
    path: ADD_ROUTE,
    Component: TutorialAdd
  },
  {
    title: `List`,
    path: TUTORIALS_ROUTE,
    Component: TutorialsList
  },
  {
    title: `More`,
    path: MORE_ROUTE,
    Component: More
  }
];
