import { getRandomArrayElement } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

imgFilters.classList.remove('img-filters--inactive');

// const setImgFilters = (photos) => {

imgFilters.addEventListener('click', (evt) => {
  const choosenFilter = evt.target;

  switch(choosenFilter) {
    case filterDefault:
      filterDefault.classList.add('img-filters__button--active');
      filterRandom.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');
      return photos;
    case filterRandom:
      filterRandom.classList.add('img-filters__button--active');
      filterDefault.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');
      let arr = [];
      for(let i = 0; i <= 10; i++) {
        arr.push(getRandomArrayElement(photos));
      }

      return console.log(arr);
    case filterDiscussed:
      filterDiscussed.classList.add('img-filters__button--active');
      filterDefault.classList.remove('img-filters__button--active');
      filterRandom.classList.remove('img-filters__button--active');

  }
});
// };


// imgFilters.addEventListener('click', (evt) => {
//   const choosenFilter = evt.target;
//   if(choosenFilter.classList.contains('img-filters__button--active')) {
//     console.log('этот фильтр уже выбран');
//     return;
//   }
//   switch (choosenFilter.id) {
//     case 'filter-default':
//       console.log('возращаем массив без изменений');
//       choosenFilter.classList.add('img-filters__button--active')
//       return;
//     case 'filter-random':
//       console.log('возвращаем 10 случайных фото');
//       choosenFilter.classList.add('img-filters__button--active')
//       return;
//     case 'filter-discussed':
//       console.log('Сортируем массив по убыванию комментариев');
//       choosenFilter.classList.add('img-filters__button--active')
//       return;
//   }
// });

// imgFilters.addEventListener('focusout', (evt) => {
//   evt.target.classList.remove('img-filters__button--active');
// });
