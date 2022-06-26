import { createPhoto, photoAlbum } from './create-photo.js';

createPhoto();

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialCaptions = document.querySelector('.social__caption');

// Функция и обработчики для закрытия большой картинки
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
bigPictureCloseButton.addEventListener('click', () => closeBigPicture());
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    closeBigPicture();
  }
});

// Функция для создания DOM-элемента
const createNewElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const addPictureClickHandler = (element) => {
  element.addEventListener('click', ()=> {
    bigPictureImg.src = element.querySelector('.picture__img').src;
    likesCount.textContent = element.querySelector('.picture__likes').textContent;
    commentsCount.textContent = element.querySelector('.picture__comments').textContent;

    socialComments.innerHTML = '';

    // Находим объект по index, чтобы вернуть комментарии, описание и т.д. к картинке
    const currentIndex = Number(element.dataset.index);
    photoAlbum.forEach((item, index) => {
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

    bigPicture.classList.remove('hidden');
    const socialCommentCount = document.querySelector('.social__comment-count');
    const commentsLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');

  });
};

pictures.forEach((element) => {
  addPictureClickHandler(element);
});
