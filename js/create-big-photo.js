import { renderPhotos } from './render-photos.js';
import {isEsc, createNewElement} from './util.js';

const picturesSection = document.querySelector('.pictures');

const createBigPhoto = (photos) => {
  renderPhotos(photos);

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  const likesCount = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');
  const socialComments = document.querySelector('.social__comments');
  const socialCaptions = document.querySelector('.social__caption');

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
    const socialCommentCount = document.querySelector('.social__comment-count');
    const commentsLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    // Добавляем обработчик esc
    document.addEventListener('keydown', onBigPictureEscKeydown);
  }

  // Функция закрытия большой картинки
  function closeBigPicture ()  {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // Удаляем обработчик esc
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }

  bigPictureCloseButton.addEventListener('click', () => closeBigPicture());

  // Добавляем делегирование на контейнер картинок
  picturesSection.addEventListener('click', (evt) => {
    const currentElement = evt.target; // Объект, на который кликнули

    if(currentElement.classList.contains('picture__img')) {

      const currentIndex = Number(currentElement.closest('a').dataset.index); // Текущий индекс элемента из data-атрибута
      bigPictureImg.src = currentElement.src;
      likesCount.textContent = currentElement.closest('a').querySelector('.picture__likes').textContent;
      commentsCount.textContent = currentElement.closest('a').querySelector('.picture__comments').textContent;
      socialComments.textContent = ''; // Очистили шаблонные комментарии

      // Находим объект по index, чтобы создать комментарии, описание и т.д. к картинке
      photos.forEach((item, index) => {
        if(index === currentIndex) {
          item.comments.forEach((comment) => {
            const socialComment = createNewElement('li','social__comment');
            const socialPicture = createNewElement('img','social__picture');
            socialPicture.src = comment.avatar;
            socialPicture.alt = comment.name;
            socialPicture.width = '35';
            socialPicture.height = '35';
            const socialText = createNewElement('p', 'social__text', comment.message);
            socialComment.append(socialPicture);
            socialComment.append(socialText);
            socialComments.append(socialComment);
          });
          socialCaptions.textContent = item.description;
        }
      });
      openBigPicture();
    }
  });

};

export {createBigPhoto};
