const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (...rest) => {
    // console.log(rest);
});


const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview');

effectsList.addEventListener('click', (evt) => {
  const currentElement = evt.target;
  if (currentElement.tagName === 'INPUT') {
    const effectPreviewModificator = currentElement.closest('li').querySelector('span').classList[1]; // определяем какой модификатор нужно добавить к картинке

    if (imgUploadPreview.classList.length > 1) { // если модификаторов у картинки больше чем 1
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]); // то удаляем 2-й
    }
    console.log(imgUploadPreview.classList.length);
    imgUploadPreview.classList.add(effectPreviewModificator);
  }
}
);
