import React from 'react';

const More = () => {
  return (
    <div className="about">
      <h1 className="about__title">About <span>AND</span> more</h1>
      <p>Приложение позволяет создавать список всего на свете))) и хранить данные между сессиями.</p>
      <p>Данные можно редактировать, к ним можно добавлять особые метки, можно удалять.</p>
      <p>Все изменения в режиме онлайн немедленно сохраняются на сервере</p>
      <p>Основано на <strong>React</strong> и использует в качестве стора сервер <strong>Firebase</strong></p>
      <p>Оформлеление оригинальное и использует препроцессор <strong>SASS</strong></p>
    </div>
  );
};

export default More;
