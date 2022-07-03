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

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isEsc = (evt) => evt.key === 'Escape';
const isEnter = (evt) => evt.key === 'Enter';

const testUnique = (value) =>
{
  const n = value.length;
  for (let i = 0; i < n-1; i++)
  { for (let j = i+1; j < n; j++)
  { if (value[ i ] === value[j]) {return false;} }
  }
  return true;
};

export {getRandomIntInclusive, checkStringLength, isEsc, isEnter, testUnique};
