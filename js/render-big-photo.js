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

  // Функция устанавливает количество комментариев для загрузки
  const getSocialCommentsForLoading = (pictureComments) => {
    if(pictureComments > SOCIAL_COMMENT_COUNT) {
      return SOCIAL_COMMENT_COUNT;
    }
    return pictureComments;
  };


  bigPictureCloseButton.addEventListener('click', () => closeBigPicture());

  // Добавляем делегирование на контейнер картинок
  picturesSection.addEventListener('click', (evt) => {
    const currentElement = evt.target; // Объект, на который кликнули

    if(currentElement.classList.contains('picture__img')) {
      // Считываем данные из картинки, по которой кликнули
      const currentPicture = Number(currentElement.closest('a').dataset.index); // Текущий индекс элемента из data-атрибута
      const pictureLikes = currentElement.closest('a').querySelector('.picture__likes').textContent; // Кол-во лайков
      const pictureComments = currentElement.closest('a').querySelector('.picture__comments').textContent; // Кол-во комментариев всего
      const socialCommentsForLoading = getSocialCommentsForLoading(pictureComments);

      // Записываем данные в большую картинку и комментарии к ней
      bigPictureImg.src = currentElement.src;
      likesCount.textContent = pictureLikes;
      commentsCount.textContent = `${ pictureComments } комментариев`;
      socialCommentCount.textContent = `${ socialCommentsForLoading } из `;
      socialCommentCount.append(commentsCount);

      // Очищаем шаблонные комментарии
      socialComments.textContent = '';

      // Находим объект по index, чтобы создать комментарии, описание и т.д. к большой картинке
      photos.forEach((item, index) => {
        if(index === currentPicture) {
          for(let i = 0; i < socialCommentsForLoading; i++) {
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
