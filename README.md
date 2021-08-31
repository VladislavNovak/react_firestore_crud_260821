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

  ### Перечисляем в константах все возможные пути
  src/utils/constants.js

    export const TUTORIALS_ROUTE = `/tutorials`;
    export const ADD_ROUTE = `/add`;

  ### Описываем все пути в массиве объектов
  src/utils/routes.js

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

  ### Подключаем пути
  src/components/app.jsx

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

  ### Устанавливаем в приложение и импортируем стили

    npm install bootstrap

    import "bootstrap/dist/css/bootstrap.min.css";

## Подключаем firestore

  ### Регистрируем firestore в приложении
  src/utils/firebase.js

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

  ### Объединяем все CRUD операции в одном файле
  src/services/firebase.js

  Перечислим все операции, с помощью которых будем взаимодействовать с документами приложения

    import firebase from "../utils/firebase";

    const db = firebase.collection(`/tutorials`);

    const getAll = () => db;
    const create = (data) => db.add(data);
    const update = (id, value) => db.doc(id).update(value);
    const remove = (id) => db.doc(id).delete();

    const DataService = {getAll, create, update, remove};

    export default DataService;

## Создаем страничку с функционалом добавления документа

  ### Базовая структура для создания документа
  src/utils/constants.js

    export const Controls = [`title`, `description`];

  Массив будет служить основой для создания полей формы и для тех данных, которые будут заносится в базу firestore. Таким образом, если появится необходимость в изменении проекта, можно динамически добавлять всю необходимую информацию

  ### Создаем форму с полями
  src/components/tutorial-add

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

  ### Сохраняем новый документ в firestore
  src/components/tutorial-add

  Создаем стейт, который управляет отрисовкой конкретных jsx блоков

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

## Создаем страничку с перечислением коллекции

  ### Получаем данные из firestore
  src/components/tutorial-list

  Помимо jsx кода добавляем стейт tutorials. Он будет содержать всю коллекцию (массив документов) из firestore:

    const [tutorials, setTutorials] = useState([]);

  tutorials обновляется в useEffect. Здесь мы подписываемся на прослушивание события. При заверщении useEffect нужно отписаться от события, чтобы не происходила утечка памяти. Далее - событие onSnapshot реагирует на все изменения в коллекции получаемой с сервера. Когда они происходят, в onDataChange получаем коллекцию, извлекаем документы, перебираем их и сортируем (посредством arrangeObjectProperties; это необязательно, но это лучше для производительности):

    const onDataChange = (snapshot) => {
      const data = snapshot.docs.map((item) => {
        const ordered = arrangeObjectProperties(item);
        return {id: item.id, ...ordered};
      });

      setTutorials(data);
    };

    useEffect(() => {
      const unsubscribe = DataService.getAll().orderBy(`title`, `asc`).onSnapshot(onDataChange);
      return unsubscribe;
    }, []);

  ### Реагируем на выбор конкретного документа
  src/components/tutorial-list

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
  
## Заменяем обычное получение данных из firebase на hooks
  src/components/tutorial-list

  Ранее, для получения данных с сервера мы использовали слушатель событий onSnapshot(onDataChange), который помещали в useEffect (это весь код из расположенного выше раздела "Получаем данные из firestore"). Теперь же мы можем удалить весь тот код и заменить его хуком useCollection, который результатом своей работы извлекает не только данные с сервера, но и статус состояния, и ошибку, если такая случилась:

    import {useCollection} from "react-firebase-hooks/firestore";

    const [tutorials, loading, error] = useCollection(DataService.getAll().orderBy(`title`, `asc`));

  ### Подгоняем jsx под хук
  src/components/tutorial-list

  Добавляем обработку loading, error. И, важно, теперь это не просто данные, а данные.data(). Следовательно, корректируем и метод setActiveTutorial():

    const setActiveTutorial = (tutorial, index) => {
      const {title, description, published} = tutorial.data();
      setCurrentTutorial({id: tutorial.id, title, description, published});
      setCurrentIndex(index);
    };

    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Loading...</span>}
      <ul className="list-group">
        { !loading && tutorials && tutorials.docs.map((tutorial, index) => (
          <li
            key={tutorial.id}
            onClick={() => setActiveTutorial(tutorial, index)}
            className={`list-group-item ` + (index === currentIndex ? `active` : ``)}>
            {tutorial.data().title}
          </li>
        ))}
      </ul>
    </div>

## Создаем страничку с документом

  ### Передаем пропсы в компонент для отображения в jsx коде
  src/components/tutorial

  Ранее в TutorualList мы уже передали в компонент необходимые данные. Теперь же их извлечем:

    const Tutorial = ({currentTutorial, refreshList}) => {}
    export default Tutorial;

  Далее - создаем стейт, в котором будем эти данные хранить. Напомню: используя конструкцию ...Object.fromEntries, мы можем добавлять в объект любое количество полей. Так как у нас поля основаны на данных из src/utils/constants, то и полей у нас будет лишь два - title и description:

    const initialTutorialState = {
      id: null,
      ...Object.fromEntries(Controls.map((item) => [item, ``])),
      published: false,
    };

    const [tutorial, setTutorial] = useState(initialTutorialState);

    if (tutorial.id !== currentTutorial.id) {
      setTutorial(currentTutorial);
    }

  ### Добавляем элементам формы управляемость
  src/components/tutorial

  Теперь весь код jsx формируется на основе данных из tutorial. Добавим им взаимодействие:

    const handleInputChange = ({target: {name, value}}) => {
      setTutorial({...tutorial, [name]: value});
    };

    <form>
      {
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
    </form>

  ### Добавляем функционал: обновление конкретного поля, обновление всего документа, удаление документа
  src/components/tutorial

    import DataService from '../../services/data-service';

    
    const updatePublishedStatus = (status) => {
      DataService.update(tutorial.id, {published: status})
        .then(setTutorial({...tutorial, published: status}))
    };

    const updateTutorial = () => {
      const data = extractProperty(tutorial);
      DataService.update(tutorial.id, data)
    };

    const deleteTutorial = () => {
      DataService.remove(tutorial.id)
        .then(refreshList)
    };

    <button
      className="btn btn-primary m-1"
      onClick={() =>updatePublishedStatus(!tutorial.published)} >
      {tutorial.published ? `UnPublish` : `Publish`}
    </button>

    <button onClick={deleteTutorial} className="btn btn-danger m-1">Delete</button>

    <button onClick={updateTutorial} className="btn btn-success m-1">Update</button>

  На этом основной функционал закончен. Нюансы можно найти в самом проекте
