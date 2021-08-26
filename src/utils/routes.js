import {TUTORIALS_ROUTE, ADD_ROUTE} from './constants';
import TutorialsList from '../components/tutorials-list/tutorials-list';
import AddTutorial from '../components/add-tutorial/add-tutorial';

export const publicRoutes = [
  {
    title: `List`,
    path: TUTORIALS_ROUTE,
    Component: TutorialsList
  },
  {
    title: `Add`,
    path: ADD_ROUTE,
    Component: AddTutorial
  }
];
