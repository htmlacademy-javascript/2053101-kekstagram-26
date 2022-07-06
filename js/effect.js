import { EFFECTS } from './data.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview');

// Обработчик добавляет модификатор к картинке
const onEffectListClick = (evt) => {
  const currentElement = evt.target;
  if (currentElement.tagName === 'INPUT') {
    const effectPreviewModificator = currentElement.closest('li').querySelector('span').classList[1]; // определяем какой модификатор нужно добавить к картинке
    if (imgUploadPreview.classList.length > 1) { // если модификаторов у картинки больше чем 1
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]); // то удаляем 2-й
    }
    imgUploadPreview.classList.add(effectPreviewModificator);

    // const maxSet = EFFECTS.forEach((element) => {
    //   if(element.effect === effectPreviewModificator) {
    //     const maxP = element.max;
    //     console.log(maxP);
    //     return maxP;
    //   }
    // });
    // console.log(maxSet());

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 5,
      },
      step: 0.1,
    });
  }
};
// Добавляем обработчик на click по картинке
effectsList.addEventListener('click', (evt) => onEffectListClick(evt));


const valueElement = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  // console.log(valueElement.value)
});

