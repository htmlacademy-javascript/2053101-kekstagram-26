import { getRandomIntInclusive, checkStringLength } from './util.js';
import { DESCRIPTIONS, MESSAGES, NAMES, NUMBER_ID_PHOTOS } from './data.js';

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

const createPhotoAlbum = () => Array.from({length:NUMBER_ID_PHOTOS}, createPostPhoto);

console.log(createPhotoAlbum());