import { createPhoto } from './create-photo.js';

createPhoto();

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');

// console.log(bigPictureImg);

bigPictureCloseButton.addEventListener('click', () => bigPicture.classList.add('hidden'));
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  }
});

const addPictureClickHandler = function(element) {
  element.addEventListener('click', ()=> {
    bigPictureImg.src = element.querySelector('.picture__img').src;
    likesCount.textContent = element.querySelector('.picture__likes').textContent;
    commentsCount.textContent = element.querySelector('.picture__comments').textContent;

    bigPicture.classList.remove('hidden');

    console.log(bigPictureImg.src, likesCount.textContent);
  });
};

pictures.forEach((element) => {
  addPictureClickHandler(element);
});
