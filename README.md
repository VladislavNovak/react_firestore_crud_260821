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

## Создаем страничку с функционалом добавления документа

  ### src/utils/constants.js

    export const Controls = [`title`, `description`];

  Массив будет служить основой для создания полей формы и для тех данных, которые будут заносится в базу firestore. Таким образом, если появится необходимость в изменении проекта, можно динамически добавлять всю необходимую информацию

  ### src/components/tutorial-add

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

  ### src/components/tutorial-add

  Создаем стейт, который управляет отрисовкой конкретныъ jsx блоков

    const [submitted, setSubmitted] = useState(false);

  В каждом из блоков, которые будут показываться в зависимости от submitted, создаем свою кнопки. Одна будет служить для создания новой формы (newTutorial), а когда форма создана, для отправки данных на сервер (saveTutorial):

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

## Создаем страничку с перечислением документов, которые добавлены в функционале выше

  ### src/components/tutorial-add

  Помимо jsx кода добавляем стейт. 
  tutorials содержит массив всех документов (далее - коллекция) в firestore:

    const [tutorials, setTutorials] = useState([]);

  tutorials обновляется в useEffect. Здесь мы подписываемся на прослушивание события. При заверщении useEffect нужно отписаться от события, чтобы не происходила утечка памяти. Далее - событие onSnapshot реагирует на все изменения в коллекции получаемой с сервера. Когда они происходят, в onDataChange получаем коллекцию, извлекаем документы, перебираем их и сортируем (это необязательно, но это лучше для производительности):

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

  currentTutorial отвечает за текущий выбранный документ, а currentIndex - за его индекс (это просто позиция документа в коллекции):

    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const setActiveTutorial = ({id, title, description, published}, index) => {
      setCurrentTutorial({id, title, description, published});
      setCurrentIndex(index);
    };

     <li
      key={tutorial.id}
      onClick={() => setActiveTutorial(tutorial, index)}
      className={`list-group-item ` + (index === currentIndex ? `active` : ``)}>
      {tutorial.title}
    </li>

  Теперь, когда данные получены, а документ выбран, в него можно передать информацию для отрисовки и оперирования:

      import Tutorial from '../tutorial/tutorial.jsx';

      const refreshList = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
      };

      const renderIfCurrentTutorialTrue = () => (
        <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
      );
  

  