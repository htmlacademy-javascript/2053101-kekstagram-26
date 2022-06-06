/* eslint-disable no-nested-ternary */
// Источник функции https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = (min >= max) ? 'Ошибка! min больше или равно max' :
    (min < 0) ? 'Ошибка! Числа должны быть больше 0' :
      Math.floor(Math.random() * (max - min + 1) + min);
  return result;
}
getRandomIntInclusive(1,5);
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('hello', 2);
