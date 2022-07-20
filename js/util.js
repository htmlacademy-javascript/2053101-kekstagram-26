import { ALERT_SHOW_TIME } from './data.js';

// Источник функции https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // eslint-disable-next-line no-nested-ternary
  const result = (min >= max) ? 'Ошибка! min больше или равно max' :
    (min < 0) ? 'Ошибка! Числа должны быть больше 0' :
      Math.floor(Math.random() * (max - min + 1) + min);
  return result;
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isEsc = (evt) => evt.key === 'Escape';
const isEnter = (evt) => evt.key === 'Enter';

// Функция для создания DOM-элемента
const createNewElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const testUnique = (value) =>
{
  const n = value.length;
  for (let i = 0; i < n-1; i++)
  { for (let j = i+1; j < n; j++)
  { if (value[ i ] === value[j]) {return false;} }
  }
  return true;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { getRandomIntInclusive, checkStringLength, isEsc, isEnter, testUnique, createNewElement,
  showAlert, getRandomArrayElement, debounce };
