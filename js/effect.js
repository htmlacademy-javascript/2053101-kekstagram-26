
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
  }
};
// Добавляем обработчик на click по картинке
effectsList.addEventListener('click', (evt) => onEffectListClick(evt));

const sliderElement = document.querySelector('.effect-level__slider');
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
  console.log(valueElement.value)
});

