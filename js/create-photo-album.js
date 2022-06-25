import { getRandomIntInclusive, checkStringLength } from './util.js';
import { DESCRIPTIONS, MESSAGES, NAMES, NUMBER_ID_PHOTOS, MAX_SYMBOLS } from './data.js';

const createComment = () => {
  const textMessage = MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)];
  if (checkStringLength(textMessage, MAX_SYMBOLS)) {
    return {
      id: getRandomIntInclusive(0, 1000),
      avatar: `img/avatar-${ getRandomIntInclusive(1, 6) }.svg`,
      message: textMessage,
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    };}
};

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


const pictureTemplate = document.querySelector('#picture').content.querySelector('a');
const photoAlbum = createPhotoAlbum();
const photoAlbumFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

photoAlbum.forEach((element) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = element.url;
  newPicture.querySelector('.picture__likes').textContent = element.likes;
  newPicture.querySelector('.picture__comments').textContent = element.comments.length;
  photoAlbumFragment.append(newPicture);
});

picturesContainer.append(photoAlbumFragment);

export {createPhotoAlbum};


// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям,
//  и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.