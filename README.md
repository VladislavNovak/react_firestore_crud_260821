# Road map

Это учебный проект. Реализует взаимодействие с Firestore используя принципы CRUD

## Создаем проект используя Create React App

  ### Если установлен npm 5.2.0+, лучше использовать npx
  
    npx create-react-app react_firestore_crud_260821

  ###  Удаляем все файлы, которые точно не понадобятся в проекте

## Добавляем зависимости

  ### DevDependencies
  
    npm i @babel/core eslint eslint-config-htmlacademy -DE

  ### Dependencies
  
    npm i react-router-dom typescript firebase react-firebase-hooks node-sass

## Для корректной работы линтера создаем файлы

  ### .editorconfig .eslintrc.yml

## Импортируем BrowserRouter и оборачиваем App

  ### src/.index

    import {BrowserRouter} from 'react-router-dom';

    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById(`root`)
    );

## Настраиваем маршрутизатор

  ### src/utils/constants.js

    export const TUTORIALS_ROUTE = `/tutorials`;
    export const ADD_ROUTE = `/add`;

  ### src/utils/routes.js

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

  ### src/components/app.jsx

    import {Switch, Route, Link, Redirect} from "react-router-dom";
    import {publicRoutes} from '../../utils/routes';
    import {TUTORIALS_ROUTE} from '../../utils/constants';

    <div>
      {publicRoutes.map(({path, title}) => (
        <li key={path}>
          <Link to={path}>{title}</Link>
        </li>
      ))}
    </div>

    <div>
      <Switch>
        {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact />)}
        <Redirect to={TUTORIALS_ROUTE} />
      </Switch>
    </div>

  Switch итерируется по всем путям и в том случае, если ничего не найдено, возвращает последний маршрут. В нашем случае - Redirect. Это необходимо для того, чтобы пользователь, при неверном наборе пути, возвращался или на TUTORIALS_ROUTE
