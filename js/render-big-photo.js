import { renderPhotos } from './render-photos.js';
import { isEsc, createNewElement } from './util.js';
import { SOCIAL_COMMENTS_STEP } from './data.js';
import './filter.js';

const picturesSection = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const socialComments = document.querySelector('.social__comments');
const socialCaptions = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count'); // Контейнер для кол-ва комментариев
const commentsCount = document.querySelector('.comments-count');
const commentsLoader = document.querySelector('.comments-loader');
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
    commentsLoader.classList.add('hidden');
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
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  bigPictureCloseButton.addEventListener('click', () => closeBigPicture());
  
}

// Функция закрытия большой картинки
function closeBigPicture ()  {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCloseButton.removeEventListener('click', () => closeBigPicture());
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  socialCommentsForLoading = SOCIAL_COMMENTS_STEP;
  commentsLoader.classList.remove('hidden');
}

const renderBigPhoto = (photos) => {

  renderPhotos(photos);
  // Функция отрисовывает большое фото и добавляет комментарии
  const onPictureClick = (evt) => {
    currentElement = evt.target; // Объект, на который кликнули
    if(currentElement.classList.contains('picture__img')) {
      // Считываем данные из картинки, по которой кликнули
      const currentPictureIndex = Number(currentElement.closest('a').dataset.index); // Текущий индекс элемента из data-атрибута
      const currentPictureLikes = currentElement.closest('a').querySelector('.picture__likes').textContent; // Кол-во лайков
      const currentPictureComments = currentElement.closest('a').querySelector('.picture__comments').textContent; // Кол-во комментариев всего
      const socialCommentsForLoadingValue = getSocialCommentsForLoading(currentPictureComments);

      // Записываем данные в большую картинку и комментарии к ней
      bigPictureImg.src = currentElement.src;
      likesCount.textContent = currentPictureLikes;
      commentsCount.textContent = `${ currentPictureComments } комментариев`;
      socialCommentCount.textContent = `${ socialCommentsForLoadingValue } из `;
      socialCommentCount.append(commentsCount);

      // Очищаем шаблонные комментарии
      socialComments.textContent = '';

      // Находим объект по index, чтобы создать комментарии, описание и т.д. к большой картинке
      photos.forEach((item, index) => {
        if(index === currentPictureIndex) {
          for(let i = 0; i < socialCommentsForLoadingValue; i++) {
            const socialComment = createNewElement('li','social__comment');
            const socialPicture = createNewElement('img','social__picture');
            socialPicture.src = item.comments[i].avatar;
            socialPicture.alt = item.comments[i].name;
            socialPicture.width = '35';
            socialPicture.height = '35';
            const socialText = createNewElement('p', 'social__text', item.comments[i].message);
            socialComment.append(socialPicture);
            socialComment.append(socialText);
            socialComments.append(socialComment);
          }
          socialCaptions.textContent = item.description;
        }
      });
      debugger;
      openBigPicture();
    }
  };

  // Добавляем делегирование на контейнер картинок
  picturesSection.addEventListener('click', onPictureClick);

};

export {renderBigPhoto};
