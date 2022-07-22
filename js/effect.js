import { EFFECTS } from './data.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview');
const valueElement = document.querySelector('.effect-level__value');
const sliderFieldElement = document.querySelector('.img-upload__effect-level');

// Cоздаем слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// Функция скрывает слайдер
// удаляет модификатор класса и стиль к фото
const closeSliderElement = () => {
  sliderFieldElement.classList.add('hidden');
  imgUploadPreviewElement.classList.remove(imgUploadPreviewElement.classList[1]);
  imgUploadPreviewElement.style.filter = '';
};

// Обработчик на изменение ползунка слайдера
// применяет выбранный эффект к фото
const onSliderElementUpdate = (effectPreviewModifier) => {
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    switch (effectPreviewModifier) {
      case 'effects__preview--chrome':
        imgUploadPreviewElement.style.filter = `grayscale(${valueElement.value})`;
        break;
      case 'effects__preview--sepia':
        imgUploadPreviewElement.style.filter = `sepia(${valueElement.value})`;
        break;
      case 'effects__preview--marvin':
        imgUploadPreviewElement.style.filter = `invert(${valueElement.value}%)`;
        break;
      case 'effects__preview--phobos':
        imgUploadPreviewElement.style.filter = `blur( ${ valueElement.value }px)`;
        break;
      case 'effects__preview--heat':
        imgUploadPreviewElement.style.filter = `brightness(${valueElement.value})`;
        break;
    }
  });
};

// Обработчик добавляет модификатор к картинке
const onEffectListClick = (evt) => {
  const currentElement = evt.target;
  if (currentElement.tagName === 'INPUT') {
    const effectPreviewModifier = currentElement.closest('li').querySelector('span').classList[1]; // определяем какой модификатор нужно добавить к картинке

    // если выбран фильтр ОРИГИНАЛ
    if (effectPreviewModifier === 'effects__preview--none') {
      closeSliderElement();
      return;
    } else {
      sliderFieldElement.classList.remove('hidden');
    }

    if (imgUploadPreviewElement.classList.length > 1) { // если модификаторов у картинки больше чем 1
      imgUploadPreviewElement.classList.remove(imgUploadPreviewElement.classList[1]); // то удаляем 2-й
    }
    imgUploadPreviewElement.classList.add(effectPreviewModifier);

    let min;
    let max;
    let step;
    let start;

    EFFECTS.forEach((element) => {
      if(element.effect === effectPreviewModifier) {
        min = element.min;
        max = element.max;
        step = element.step;
        start = element.start;
      }
    });

    // Обновляем установки слайдера
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      step: step,
      start: start,
    });

    onSliderElementUpdate(effectPreviewModifier);

  }
};

// Добавляем обработчик на click по картинке
effectsListElement.addEventListener('click', (evt) => onEffectListClick(evt));

sliderFieldElement.classList.add('hidden');

export { closeSliderElement };
