import { EFFECTS } from './data.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const valueElement = document.querySelector('.effect-level__value');

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
  sliderElement.classList.add('hidden');
  imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
  imgUploadPreview.style.filter = '';
};

// Обработчик на изменение ползунка слайдера
// применяет выбранный эффект к фото
const onSliderElementUpdate = (effectPreviewModifier) => {
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    switch (effectPreviewModifier) {
      case 'effects__preview--chrome':
        imgUploadPreview.style.filter = `grayscale(${valueElement.value})`;
        break;
      case 'effects__preview--sepia':
        imgUploadPreview.style.filter = `sepia(${valueElement.value})`;
        break;
      case 'effects__preview--marvin':
        imgUploadPreview.style.filter = `invert(${valueElement.value}%)`;
        break;
      case 'effects__preview--phobos':
        imgUploadPreview.style.filter = `blur( ${ valueElement.value }px)`;
        break;
      case 'effects__preview--heat':
        imgUploadPreview.style.filter = `brightness(${valueElement.value})`;
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
      sliderElement.classList.remove('hidden');
    }

    if (imgUploadPreview.classList.length > 1) { // если модификаторов у картинки больше чем 1
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]); // то удаляем 2-й
    }
    imgUploadPreview.classList.add(effectPreviewModifier);

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
effectsList.addEventListener('click', (evt) => onEffectListClick(evt));

sliderElement.classList.add('hidden');

export { closeSliderElement };
