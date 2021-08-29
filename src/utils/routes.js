import {TUTORIALS_ROUTE, ADD_ROUTE} from './constants';
import TutorialsList from '../components/tutorials-list/tutorials-list';
import TutorialAdd from '../components/tutorial-add/tutorial-add';

export const publicRoutes = [
  {
    title: `List`,
    path: TUTORIALS_ROUTE,
    Component: TutorialsList
  },
  {
    title: `Add`,
    path: ADD_ROUTE,
    Component: TutorialAdd
  }
];
