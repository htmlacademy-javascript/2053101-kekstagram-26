import { isEsc, createNewElement } from './util.js';
import { SOCIAL_COMMENTS_STEP } from './data.js';
import './filter.js';

const picturesSectionElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const likesCountElement = document.querySelector('.likes-count');
const socialCommentsElement = document.querySelector('.social__comments');
const socialCaptionsElement = document.querySelector('.social__caption');
const socialCommentCountElement = document.querySelector('.social__comment-count'); // Контейнер для кол-ва комментариев
const commentsCountElement = document.querySelector('.comments-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
let socialCommentsForLoading = 5;


// Обработчик на загрузку непоказанных комментариев
let currentElement;
const onCommentsLoaderClick = () => {
  socialCommentsForLoading += SOCIAL_COMMENTS_STEP;
  currentElement.click(); // Кликаем по текущей картинке большого фото с комментариями
};

// Функция устанавливает количество комментариев для загрузки
// И скрывает кнопку на загрузку комментариев
const getSocialCommentsForLoading = (pictureComments) => {
  if(pictureComments > socialCommentsForLoading) {
    return socialCommentsForLoading;
  } else {
    commentsLoaderElement.classList.add('hidden');
    return pictureComments;
  }
};

// Обработчик esc
const onBigPictureEscKeydown = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция открытия большой картинки
function openBigPicture () {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  bigPictureCloseButtonElement.addEventListener('click', () => closeBigPicture());

}

// Функция закрытия большой картинки
function closeBigPicture ()  {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCloseButtonElement.removeEventListener('click', () => closeBigPicture());
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  socialCommentsForLoading = SOCIAL_COMMENTS_STEP;
  commentsLoaderElement.classList.remove('hidden');
}

// Функция возвращает отфильтрованные фото
let photos = [];
const renderComments = (filteredPhotos) => {
  photos = filteredPhotos;
};

// Функция отрисовывает большое фото и добавляет комментарии
const onPictureClick = (evt) => {
  currentElement = evt.target; // Объект, на который кликнули
  if(currentElement.classList.contains('picture__img')) {
    // Считываем данные из картинки, по которой кликнули
    const currentPictureIndex = Number(currentElement.closest('a').dataset.index); // Текущий индекс элемента из data-атрибута
    const currentPictureLikes = currentElement.closest('a').querySelector('.picture__likes').textContent; // Кол-во лайков
    const currentPictureComments = currentElement.closest('a').querySelector('.picture__comments').textContent; // Кол-во комментариев всего
    const socialCommentsForLoadingValue = getSocialCommentsForLoading(currentPictureComments); // Кол-во лайков для загрузки

    // Записываем данные в большую картинку и комментарии к ней
    bigPictureImgElement.src = currentElement.src;
    likesCountElement.textContent = currentPictureLikes;
    commentsCountElement.textContent = `${ currentPictureComments } комментариев`;
    socialCommentCountElement.textContent = `${ socialCommentsForLoadingValue } из `;
    socialCommentCountElement.append(commentsCountElement);

    // Очищаем шаблонные комментарии
    socialCommentsElement.textContent = '';

    // Находим объект по index, чтобы создать комментарии, описание и т.д. к большой картинке
    photos.forEach((photo, photoIndex) => {
      if(photoIndex === currentPictureIndex) {
        for(let i = 0; i < socialCommentsForLoadingValue; i++) {
          const socialComment = createNewElement('li','social__comment');
          const socialPicture = createNewElement('img','social__picture');
          socialPicture.src = photo.comments[i].avatar;
          socialPicture.alt = photo.comments[i].name;
          socialPicture.width = '35';
          socialPicture.height = '35';
          const socialText = createNewElement('p', 'social__text', photo.comments[i].message);
          socialComment.append(socialPicture);
          socialComment.append(socialText);
          socialCommentsElement.append(socialComment);
        }
        socialCaptionsElement.textContent = photo.description;
      }
    });

    openBigPicture();

  }
};

// Добавляем делегирование на контейнер картинок
picturesSectionElement.addEventListener('click', onPictureClick);


export {renderComments};
