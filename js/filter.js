import { renderBigPhoto } from './render-big-photo.js';
import { getRandomArrayElement } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

imgFilters.classList.remove('img-filters--inactive');

// Функция для сортировки фото по убыванию комментариев
function compareCommentNumbers(a, b) {
  return b.comments.length - a.comments.length;
}

const setImgFilters = (photos) => {
  
  imgFilters.addEventListener('click', (evt) => {
    let filteredPhotos = [];
    const choosenFilter = evt.target;

    if(choosenFilter.classList.contains('img-filters__button--active')) {
      return;
    }

    switch(choosenFilter) {
      case filterDefault:
        filterDefault.classList.add('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');
        filteredPhotos = photos.slice();
        console.log(filteredPhotos);
        break;
      case filterRandom:
        filterRandom.classList.add('img-filters__button--active');
        filterDefault.classList.remove('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');

        for(let i = 0; i <= 10; i++) {
          filteredPhotos.push(getRandomArrayElement(photos));
        }
        console.log(filteredPhotos);
        break;
      case filterDiscussed:
        filterDiscussed.classList.add('img-filters__button--active');
        filterDefault.classList.remove('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filteredPhotos = photos.slice().sort(compareCommentNumbers);
        console.log(filteredPhotos);
        break;
    }
    renderBigPhoto(filteredPhotos);
  });

};

export { setImgFilters };
