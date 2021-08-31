// Получает объект. Возвращает тот же объект, но с отсортированными свойствами
// Примечание: js не гарантирует точный порядок свойств в объекте, но большинство
// браузеров соблюдает их порядок. Подобное поведение улучшает производительность
export const arrangeObjectProperties = (unordered) => {
  const data = unordered.data();

  const ordered = Object.keys(data).sort().reduce((obj, key) => {
    obj[key] = data[key];
    return obj;
  }, {});

  return ordered;
};

// Удаляет свойства id и published из объекта
// eslint-disable-next-line no-unused-vars
export const extractProperty = ({id, published, ...rest}) => rest;
