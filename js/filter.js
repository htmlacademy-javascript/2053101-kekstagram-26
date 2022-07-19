import { renderPhotos } from './render-photos.js';
import { renderComments } from './render-big-photo.js';
import { getRandomArrayElement } from './util.js';
import { RANDOM_PHOTOS, RERENDER_DELAY } from './data.js';
import { debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

// Функция для сортировки фото по убыванию комментариев
function compareCommentNumbers(a, b) {
  return b.comments.length - a.comments.length;
}

// Функция возвращает массив фото исходя из нажатой кнопки
function getFilteredPhotos (photos, choosenFilter) {
  let filteredPhotos = [];
  return function () {
    switch(choosenFilter) {
      case filterDefault:
        filterDefault.classList.add('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');
        filteredPhotos = photos.slice();
        break;
      case filterRandom:
        filterRandom.classList.add('img-filters__button--active');
        filterDefault.classList.remove('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');
        for(let i = 0; i <= RANDOM_PHOTOS; i++) {
          filteredPhotos.push(getRandomArrayElement(photos));
        }
        break;
      case filterDiscussed:
        filterDiscussed.classList.add('img-filters__button--active');
        filterDefault.classList.remove('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filteredPhotos = photos.slice().sort(compareCommentNumbers);
        break;
    }
    return filteredPhotos;
  }();
}

const setImgFilters = (photos) => {

  imgFilters.classList.remove('img-filters--inactive');

  imgFilters.addEventListener('click', (evt) => {
    const choosenFilter = evt.target;

    if(choosenFilter.classList.contains('img-filters__button--active') ||
      !choosenFilter.classList.contains('img-filters__button')) {
      return;
    }
    const filteredPhotos = getFilteredPhotos(photos, choosenFilter);
debugger;
    // Отрисовываем отфильтрованные фото
    debounce(renderPhotos(filteredPhotos), RERENDER_DELAY);

    // Обновляем данные для отрисовки комментариев отфильтрованных фото
    renderComments(filteredPhotos);
  });

};

export { setImgFilters };
