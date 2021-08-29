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
    import TutorialAdd from '../components/add-tutorial/add-tutorial';

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

  ### src/components/app.jsx

    import {Switch, Route, Link, Redirect} from "react-router-dom";
    import {publicRoutes} from '../../utils/routes';
    import {TUTORIALS_ROUTE} from '../../utils/constants';

    function App() {
      return (
        <div>
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
        </div>

      );
    }

    export default App;

  Switch итерируется по всем путям и в том случае, если ничего не найдено, возвращает последний маршрут. В нашем случае - Redirect. Это необходимо для того, чтобы пользователь, при неверном наборе пути, возвращался или на TUTORIALS_ROUTE

## Подключаем bootstrap

  ### Устанавливаем

    npm install bootstrap

  ### Импортируем

    import "bootstrap/dist/css/bootstrap.min.css";

## Подключаем firestore

  ### src/utils/firebase.js

    import firebase from 'firebase/compat/app';
    import 'firebase/compat/firestore';

    const firebaseConfig = {XXX};

    firebase.initializeApp(firebaseConfig);

    export default firebase.firestore();

  Внимание: подобного типа импорт актуален начиная с девятой версии firebase для совместимости с прошлыми версиями. Если планируется работать только с версиями включая девятую и новее, нужно использовать: 
  
    import {initializeApp} from 'firebase/app';

    const firebaseConfig = {XXX};

    const app = initializeApp(firebaseConfig);

  Данные для конфигурации (обозначено как XXX и содержащее apiKey, appId и прочее) можно получить на страничке проекта → project overview → project settings

  ### src/services/firebase.js

    Перечислим все операции, с помощью которых будем взаимодействовать с документами приложения

      import firebase from "../utils/firebase";

      const db = firebase.collection(`/tutorials`);

      const getAll = () => db;
      const create = (data) => db.add(data);
      const update = (id, value) => db.doc(id).update(value);
      const remove = (id) => db.doc(id).delete;

      const DataService = {getAll, create, update, remove};

      export default DataService;

## Создаем страничку с добавлением документа

  ### src/utils/constants.js

    export const Controls = [`title`, `description`];

  Массив будет служить основой для создания полей формы и для тех данных, которые будут заносится в базу firestore. Таким образом, если появится необходимость в изменении проекта, можно динамически добавлять всю необходимую информацию

  ### src/components/add-tutorial

    import {Controls} from '../../utils/constants';

    const TutorialAdd = () => {

      const initialTutorialState = {
        ...Object.fromEntries(Controls.map((item) => [item, ``])),
        published: false,
      };

      const [tutorial, setTutorial] = useState(initialTutorialState);

      const handleInputChange = ({target: {name, value}}) => {
        setTutorial({...tutorial, [name]: value});
      };

      return (
        <div>{
          Controls.map((control) => {
            return (
              <div key={control} >
                <label htmlFor={control}>{control}</label>
                <input
                  type="text"
                  name={control}
                  id={control}
                  value={tutorial[control]}
                  onChange={handleInputChange}
                  className="form-control"
                  required />
              </div>
            );
          })}
        </div>
      );
    }

    export default TutorialAdd;

  На основании массива Controls a) динамически заполняется initialTutorialState b) формируется jsx структура. На основании подобного паттерна можно создавать форму с любым количеством полей

  ### src/components/add-tutorial

    const [submitted, setSubmitted] = useState(false);

  Будет управлять отрисовкой нужных jsx блоков renderIfSubmittedTrue - renderIfSubmittedFalse

  ### src/components/add-tutorial

    import DataService from '../../services/data-service';

    <button onClick={newTutorial} >Add</button>
    <button onClick={saveTutorial} >Submit</button>

    const newTutorial = () => {
      setTutorial(initialTutorialState);
      setSubmitted(false);
    };

    const saveTutorial = () => {
      const data = {...tutorial, published: false};
      DataService.create(data).then(() => setSubmitted(true));
    };

В каждом из блоков создаем свою кнопку, которые будут показываться в зависимости от submitted. Одна будет служить для создания новой формы (newTutorial), а когда форма создана, для отправки данных на сервер (saveTutorial).
