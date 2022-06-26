import { createPhoto } from './create-photo.js';

console.log(createPhoto());

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');


// Обработчики для закрытия большой картинки
bigPictureCloseButton.addEventListener('click', () => bigPicture.classList.add('hidden'));
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  }
});

// Функция для создания DOM-элемента
const createNewElement = function(tagName, className, text) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// const newElement = createNewElement('li', 'social__comment', 'this is new comment');
// console.log(newElement);

const addPictureClickHandler = function(element) {
  element.addEventListener('click', ()=> {
    bigPictureImg.src = element.querySelector('.picture__img').src;
    likesCount.textContent = element.querySelector('.picture__likes').textContent;
    commentsCount.textContent = element.querySelector('.picture__comments').textContent;
    
    // socialComments.innerHTML = '';
    // const socialComment = createNewElement('li','social__comment');
    // const socialPicture = createNewElement('img','social__picture');
    // // socialPicture.src = element.querySelectorAll('.picture__comments')[0];
    // console.log(element.querySelectorAll('.picture__comments'));
    // socialPicture.alt = `имя комментатора`;
    // socialPicture.width = '35';
    // socialPicture.height = '35';

    // socialComment.append(socialPicture);
    // socialComments.append(socialComment);

    // `<li class="social__comment">
    // <img
    //   class="social__picture"
    //   src="{{аватар}}"
    //   alt="{{имя комментатора}}"
    //   width="35" height="35">
    // <p class="social__text">{{текст комментария}}</p>
    // </li>`
    // }
    

    bigPicture.classList.remove('hidden');

    // console.log(bigPictureImg.src, likesCount.textContent);
  });
};

pictures.forEach((element) => {
  addPictureClickHandler(element);
});
