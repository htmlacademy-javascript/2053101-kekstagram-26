/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
// Источник функции https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = (min >= max) ? 'Ошибка! min больше или равно max' :
    (min < 0) ? 'Ошибка! Числа должны быть больше 0' :
      Math.floor(Math.random() * (max - min + 1) + min);
  return result;
};
getRandomIntInclusive(1,5);

const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength('hello', 14);

// ДЗ 4.15 Больше деталей

// Описания фотографий
const DESCRIPTIONS = [
  'Вид из номера',
  'Указатель на пляж',
  'Лазурный берег',
  'Женщина с фотоаппаратом',
  'Гуляш с рисом',
  'Ламба',
  'Дольки клубники',
  'Виноградный сок',
  'Самолет, привет!',
  'Полка для обуви',
  'Проход на пляж',
  'Ауди',
  'Морской обед',
  'Котши',
  'Relax',
  'В облаках',
  'Хор',
  'Ретро авто',
  'Тапочки с подсветкой',
  'Пальмы',
  'Тушеное мясо с лаймом',
  'Закат над морем',
  'Краб',
  'Руки вверх',
  'Гиппопотам vs внедрожоник'
];
// КОММЕНТАРИИ И КОММЕНТАТОРЫ
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Михаил',
  'Евлампий',
  'Аврора',
  'Эсмиральда',
  'Сальвадор',
  'Кассиопея',
  'Рогнеда',
  'Кристина',
  'Ольга',
  'Ганс',
  'Энрике',
  'Жозефина',
  'Геннадий',
  'Лев',
  'Дормидонт',
];

const createComment = () => ({
  id: getRandomIntInclusive(0, 1000),
  avatar: `img/avatar-${ getRandomIntInclusive(1, 6) }.svg`,
  message: MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)],
  name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
});

const createPostPhoto = () => {
  const idUrlDescriptionIndex = getRandomIntInclusive(1, 25);
  return {
    id: idUrlDescriptionIndex,
    url: `photos/${  idUrlDescriptionIndex  }.jpg`,
    description: DESCRIPTIONS[idUrlDescriptionIndex - 1],
    likes: getRandomIntInclusive(15, 200),
    // Добавляем случайное кол-во комментариев от 1 до 10
    comments: Array.from({length:getRandomIntInclusive(1, 10)}, createComment),
  };
};

// eslint-disable-next-line no-unused-vars
const photoAlbum = Array.from({length:25}, createPostPhoto);
