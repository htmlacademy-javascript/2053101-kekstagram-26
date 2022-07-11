import { renderPhotos } from './render-photos.js';
import {isEsc, createNewElement} from './util.js';
import { SOCIAL_COMMENT_COUNT } from './data.js';

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

const renderBigPhoto = (photos) => {

  renderPhotos(photos);

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
  }

  // Функция закрытия большой картинки
  function closeBigPicture ()  {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }

  // Кол-во комментариев в отображаемом фото
  const socialCommentCountValue = (comments) => {
    if(comments > SOCIAL_COMMENT_COUNT) {
      return SOCIAL_COMMENT_COUNT;
    }
    return comments;
  };

  // Функция отрисовывает комментарии к большой фотографии
  const renderComments = (commentsAmount) => {
    for(let i = 0; i < socialCommentCountValue(commentsAmount); i++) { // В условии кол-во отображаемых комментариев (до 5-ти вкл.)
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

  bigPictureCloseButton.addEventListener('click', () => closeBigPicture());

  // Добавляем делегирование на контейнер картинок
  picturesSection.addEventListener('click', (evt) => {
    const currentElement = evt.target; // Объект, на который кликнули

    if(currentElement.classList.contains('picture__img')) {
      // Считываем данные из картинки, по которой кликнули
      const currentIndex = Number(currentElement.closest('a').dataset.index); // Текущий индекс элемента из data-атрибута
      const likesCountNumber = currentElement.closest('a').querySelector('.picture__likes').textContent; // Кол-во лайков
      const commentsCountAmount = currentElement.closest('a').querySelector('.picture__comments').textContent; // Кол-во комментариев всего

      // Записываем данные в большую картинку и комментарии к ней
      bigPictureImg.src = currentElement.src;
      likesCount.textContent = likesCountNumber;
      commentsCount.textContent = commentsCountAmount;
      socialCommentCount.textContent = `${ socialCommentCountValue(commentsCountAmount) } из `;
      socialCommentCount.append(commentsCount);

      // Очищаем шаблонные комментарии
      socialComments.textContent = '';

      // Находим объект по index, чтобы создать комментарии, описание и т.д. к большой картинке
      photos.forEach((item, index) => {
        if(index === currentIndex) {
          for(let i = 0; i < socialCommentCountValue(commentsCountAmount); i++) { // В условии кол-во отображаемых комментариев (до 5-ти вкл.)
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
      openBigPicture();
    }
  });

};

export {renderBigPhoto};
