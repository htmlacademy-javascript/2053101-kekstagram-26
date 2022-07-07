import { SCALE_STEP, SCALE_MAX } from './data.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
let scaleControlNumber = Number(scaleControlValue.value.replace(/%/g,''));
const imgUploadPreview = document.querySelector('.img-upload__preview');

scaleControlBigger.addEventListener('click', () => {
  if (scaleControlNumber < SCALE_MAX) {
    scaleControlNumber += SCALE_STEP;
    scaleControlValue.value = `${ scaleControlNumber }%`;
    imgUploadPreview.style.transform = `scale(${  scaleControlNumber / SCALE_MAX  })`;
  }
});

scaleControlSmaller.addEventListener('click', () => {
  if (scaleControlNumber > SCALE_STEP) {
    scaleControlNumber -= SCALE_STEP;
    scaleControlValue.value = `${ scaleControlNumber }%`;
    imgUploadPreview.style.transform = `scale(${  scaleControlNumber / SCALE_MAX  })`;
  }
});
