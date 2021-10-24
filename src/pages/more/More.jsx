import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import firebasePicture from '../../assets/pic/Built_with_Firebase_Logo_Light.png';

const More = () => {
  return (
    <div className="form about">
      <div className="about__left">
        <ul className="about__skills-list">
          <li className="about__skills-item">
            <FontAwesomeIcon icon={[`fab`, `react`]} />
          </li>
          <li className="about__skills-item">
            <FontAwesomeIcon icon={[`fab`, `js-square`]} />
          </li>
          <li className="about__skills-item">
            <FontAwesomeIcon icon={[`fab`, `git`]} />
          </li>
          <li className="about__skills-item">
            <FontAwesomeIcon icon={[`fab`, `sass`]} />
          </li>
        </ul>
        <img className="about__firebase-picture" src={firebasePicture} />
      </div>
      <div className="about__right">
        <h1 className="about__title">About <span>AND</span> more</h1>
        <p>Приложение позволяет создавать список всего на свете и хранить данные между сессиями.</p>
        <p>Данные можно редактировать, к ним можно добавлять особые метки, можно удалять.</p>
        <p>Все изменения в режиме онлайн немедленно сохраняются на сервере</p>
        <p>Основано на <strong>React</strong> и использует в качестве стора сервер <strong>Firebase</strong></p>
        <p>Оформление оригинальное и использует препроцессор <strong>Sass/SCSS</strong></p>
      </div>
    </div>
  );
};

export default More;
