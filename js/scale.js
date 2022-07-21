import { SCALE_STEP, SCALE_MAX } from './data.js';

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview');
let scaleControlNumber = Number(scaleControlValueElement.value.replace(/%/g,''));

scaleControlBiggerElement.addEventListener('click', () => {
  if (scaleControlNumber < SCALE_MAX) {
    scaleControlNumber += SCALE_STEP;
    scaleControlValueElement.value = `${ scaleControlNumber }%`;
    imgUploadPreviewElement.style.transform = `scale(${  scaleControlNumber / SCALE_MAX  })`;
  }
});

scaleControlSmallerElement.addEventListener('click', () => {
  if (scaleControlNumber > SCALE_STEP) {
    scaleControlNumber -= SCALE_STEP;
    scaleControlValueElement.value = `${ scaleControlNumber }%`;
    imgUploadPreviewElement.style.transform = `scale(${  scaleControlNumber / SCALE_MAX  })`;
  }
});
