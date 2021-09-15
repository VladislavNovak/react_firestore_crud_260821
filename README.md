# React Firestore CRUD

Проект основывается на [Create React App](https://github.com/facebookincubator/create-react-app) и реализует взаимодействие с сервером через [Firestore](https://firebase.google.com/) используя принципы CRUD

---

## Контент

- [Создаем проект на основе Create React App](#Создаем-проект-на-основе-Create-React-App)
  - [Проверяем версию npm](#Проверяем-версию-npm)
  - [Удаляем все файлы, которые точно не понадобятся в проекте](#Удаляем-все-файлы,-которые-точно-не-понадобятся-в-проекте)
- [Добавляем зависимости](#Добавляем-зависимости)
  - [DevDependencies](#DevDependencies)
  - [Dependencies](#Dependencies)
- [Создаем обслуживающие файлы](#Создаем-обслуживающие-файлы)
  - [.editorconfig ](#.editorconfig)
  - [.eslintrc.yml](#.eslintrc.yml)
  - [.gitignore](#.gitignore)
  - [.gitattributes](#.gitattributes)
- [Подключаем BrowserRouter](#Подключаем-BrowserRouter)
- [Настраиваем маршрутизатор](#Настраиваем-маршрутизатор)
  - [Перечисляем в константах все возможные пути](#Перечисляем-в-константах-все-возможные-пути)
  - [Описываем пути в виде массива объектов](#Описываем-пути-в-виде-массива-объектов)
  - [Подключаем пути](#Подключаем-пути)
- [Подключаем стили](#Подключаем-стили)
  - [Устанавливаем препроцессор в Dependencies](#Устанавливаем-препроцессор-в-Dependencies)
  - [Настраиваем папки и пути](#Настраиваем-папки-и-пути)
  - [Подключаем препроцессор к приложению](#Подключаем-препроцессор-к-приложению)
- [Подключаем шрифты](#Подключаем-шрифты)
- [Подключаем fontAwesomeIcon](#Подключаем-fontAwesomeIcon)
  - [Dependencies](#Dependencies)
  - [Создаем библиотеку](#Создаем-библиотеку)
  - [Импортируем в приложение](#Импортируем-в-приложение)
  - [Используем в компоненте](#Используем-в-компоненте)
- [Подключаем firestore](#Подключаем-firestore)
  - [Регистрируем firestore в приложении](#Регистрируем-firestore-в-приложении)
  - [Объединяем все CRUD операции в одном файле](#Объединяем-все-CRUD-операции-в-одном-файле)
- [Создаем страничку с функционалом добавления документа](#Создаем-страничку-с-функционалом-добавления-документа)
  - [Базовая структура для создания документа](#Базовая-структура-для-создания-документа)
  - [Создаем форму с полями](#Создаем-форму-с-полями)
  - [Сохраняем новый документ в firestore](#Сохраняем-новый-документ-в-firestore)
- [Создаем страничку с перечислением коллекции](#Создаем-страничку-с-перечислением-коллекции)
  - [Получаем данные из firestore](#Получаем-данные-из-firestore)
  - [Реагируем на выбор конкретного документа](#Реагируем-на-выбор-конкретного-документа)
- [Заменяем обычное получение данных из firebase на hooks](#Заменяем-обычное-получение-данных-из-firebase-на-hooks)
  - [Подгоняем jsx под хук](#Подгоняем-jsx-под-хук)
- [Создаем страничку с документом](#Создаем-страничку-с-документом)
  - [Передаем пропсы в компонент для отображения в jsx коде](#Передаем-пропсы-в-компонент-для-отображения-в-jsx-коде)
  - [CRUD](#CRUD)
- [Лайфхак: добавляем таймер для изменения стейта](#Лайфхак:-добавляем-таймер-для-изменения-стейта)

---

## Создаем проект на основе Create React App

  ### Проверяем версию npm
  
  Вводим команду node -v и если версия выше 5.2, используем npx
  
    npx create-react-app react_firestore_crud_260821

  ###  Удаляем все файлы, которые точно не понадобятся в проекте

## Добавляем зависимости

  ### DevDependencies
  
    npm i @babel/core eslint eslint-config-htmlacademy -DE

  ### Dependencies
  
    npm i react-router-dom typescript firebase react-firebase-hooks node-sass

## Для корректной работы линтера создаем файлы в верхнем уровне

  ### .editorconfig 
  
    root = true

    [*]
    charset = utf-8
    end_of_line = lf
    indent_size = 2
    indent_style = space
    insert_final_newline = true
    trim_trailing_whitespace = true

    [*.md]
    trim_trailing_whitespace = false
  
  
  ### .eslintrc.yml

    env:
    es2017: true
    browser: true
    commonjs: true
    jest: true

    extends: ['htmlacademy/es6', 'plugin:react/recommended']

    parserOptions:
      ecmaFeatures:
        jsx: true
      ecmaVersion: 2018
      sourceType: module

    plugins: ['react']

    settings:
      react:
        version: '16'

  ### .gitignore

    /node_modules
    /.pnp
    .pnp.js

    /coverage

    /build

    .DS_Store
    .env.local
    .env.development.local
    .env.test.local
    .env.production.local

    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*

  ### .gitattributes

    * text=auto

    *.doc     diff=astextplain
    *.DOC     diff=astextplain
    *.docx diff=astextplain
    *.DOCX diff=astextplain
    *.dot  diff=astextplain
    *.DOT  diff=astextplain
    *.pdf  diff=astextplain
    *.PDF     diff=astextplain
    *.rtf     diff=astextplain
    *.RTF     diff=astextplain
    *.md text
    *.tex text
    *.adoc text
    *.textile text
    *.mustache text
    *.csv text
    *.tab text
    *.tsv text
    *.sql text

    *.png binary
    *.jpg binary
    *.jpeg binary
    *.gif binary
    *.tif binary
    *.tiff binary
    *.ico binary
    *.svg binary
    #*.svg text
    *.eps binary

    .gitattributes export-ignore
    .gitignore export-ignore

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

    export const ADD_ROUTE = `/add`;
    export const MORE_ROUTE = `/more`;
    export const TUTORIALS_ROUTE = `/tutorials`;

  ### Описываем все пути в массиве объектов
  src/utils/routes.js

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

  ### Подключаем пути
  src/components/app.jsx

  Для этого импортируем NavLink. В отличии от Link он позволяет воспользоваться стилизацией для выделения активной ссылки и включает в себя а) activeClassName, значение которого просто добавляется к стилизации, и б) activeStyle, который используется в качестве встроенной стилизации (activeStyle={{color: "green", fontWeight: "bold"}})

    import {Switch, Route, Redirect, NavLink} from "react-router-dom";
    import {publicRoutes} from '../../utils/routes';
    import {TUTORIALS_ROUTE} from '../../utils/constants';

    function App() {
      return (
        <div>
          <nav id="navbar">
            <ul>
              <li>
                <p>Valdix</p>
              </li>
              {publicRoutes.map(({path, title}) => (
                <li key={path}>
                  <NavLink to={path}
                    className="navbar__link"
                    activeClassName="navbar__link--selected">
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

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

  Switch итерируется по всем путям и в том случае, если ничего не найдено, возвращает последний маршрут. В нашем случае - Redirect. Это необходимо для того, чтобы пользователь, при неверном наборе пути, возвращался или на TUTORIALS_ROUTE.

## Подключаем стили

Это возможно сделать несколькими способами: а) подключая bootstrap б) используя styledComponents в) используя препроцессор scss. Нас интересует только последний вариант

  ### Устанавливаем препроцессор в Dependencies
  
    npm i --save node-sass

  ### Настраиваем папки и пути

  Создаем папку sass по адресу src/assets/sass. В этой папке создаем файлы style.scss, fonts.scss, variables.scss, common.scss. Далее, к каждому компоненту в его папке создадим файл с аналогичным наименованием. Т.о, к примеру, в папке tutorial-add будет находится одновременно два файла - tutorial-add/tutorial-add.jsx и tutorial-add/tutorial-add.scss. Далее, определим, что главным файлом препроцессора, который мы будем подключать к приложению, будет style.scss, добавив в него импорты:

    @import "./fonts.scss";
    @import "./common.scss";
    @import "./variables.scss";

    @import "../../components/tutorial-add/tutorial-add.scss";

  ### Подключаем препроцессор к приложению
  src/index.js

    import './assets/sass/style.scss';

## Подключаем шрифты

Скачиваем необходимые шрифты и кладем их в новую папку по пути src/assets/fonts. Теперь можно в файл src/assets/sass/fonts.scss их экспортировать

    /* Marck Script */
    @font-face {
      font-family: "MarckScript";
      font-style: normal;
      font-weight: normal;
      font-display: swap;
      src:
        url("../fonts/MarckScript-Regular.ttf") format("truetype");
    }

Не забываем о том, что сам src/assets/sass/fonts.scss нужно подключить к src/assets/sass/style.scss (если ранее мы этого не сделали)

    @import "./fonts.scss";

## Подключаем fontAwesomeIcon

  ### Инсталируем в Dependencies 

    npm i -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons

  ### Создаем библиотеку
  src/utils/fontawesome.js

    import {library} from '@fortawesome/fontawesome-svg-core';

    import {
      faStar as farStarRegular,
    } from '@fortawesome/free-regular-svg-icons';

    import {
      faCoffee,
      faStar as fasStarSolid,
    } from '@fortawesome/free-solid-svg-icons';

    library.add(faCoffee, farStarRegular, fasStarSolid);

  В данном случае, поскольку наименования faStar и в стилях regular, и в solid совпадают, мы воспользовались псевдонимами.

  ### Импортируем в приложение
  src/components/app/app.jsx

    import '../../utils/fontawesome.js';

  ### Используем в компоненте
    import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

    <FontAwesomeIcon icon={[`far`, `star`]} />
    <FontAwesomeIcon icon={[`fas`, `star`]} />
    <FontAwesomeIcon icon="faCoffee" />

  Но, конечно, подключить иконку можно и напрямую, без использовани библиотеки. В этом случае весь импорт и использованиев каждом конкретном файле будут выглядеть так:
    
    import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
    import {faCoffee} from '@fortawesome/free-solid-svg-icons';

    <FontAwesomeIcon icon={faCoffee} />

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

  ### CRUD
  src/components/tutorial

  Создаем кнопки, которые отвечают за обновление конкретного поля, обновление всего документа, удаление документа

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

## Лайфхак: добавляем таймер для изменения стейта
  src/components/detail

  У нас уже есть стейт, который меняется под действием внешних факторов. Это простое сообщение информирующее о том, что данные на сервере изменились:

    const [message, setMessage] = useState(``);

  Теперь сообщение нужно изменить по прошествии времени. Помним, что все асинхронные действия должны происходить в useEffect, а в зависимость, чтобы отслеживать изменения, устанавливаем message. Помещаем в useEffect setTimeout (если речь идет о повторяющихся действиях, то  понадобится setInterval),который возвращает свой id. Он нам понадобится, чтобы при завершении useEffect очистить таймер. И последнее, что нам понадобится, это в начале useEffect отслеживать очищено ли сообщение, так как если оно пустое, небходитости в процессе никакого нет:

    useEffect(() => {
      if (!message) {
        return;
      }

      let timerId = setTimeout(() => {
        setMessage(``);
      }, 5000);

      // eslint-disable-next-line consistent-return
      return () => clearTimeout(timerId);
    }, [message]);
