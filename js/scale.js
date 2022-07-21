import { SCALE_STEP, SCALE_MAX } from './data.js';

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');


scaleControlBiggerElement.addEventListener('click', () => {
  let scaleControlValue = Number(scaleControlValueElement.value.replace(/%/g,''));
  if (scaleControlValue < SCALE_MAX) {
    scaleControlValue += SCALE_STEP;
    scaleControlValueElement.value = `${ scaleControlValue }%`;
    imgUploadPreviewElement.style.transform = `scale(${  scaleControlValue / SCALE_MAX  })`;
  }
});

scaleControlSmallerElement.addEventListener('click', () => {
  let scaleControlValue = Number(scaleControlValueElement.value.replace(/%/g,''));
  if (scaleControlValue > SCALE_STEP) {
    scaleControlValue -= SCALE_STEP;
    scaleControlValueElement.value = `${ scaleControlValue }%`;
    imgUploadPreviewElement.style.transform = `scale(${  scaleControlValue / SCALE_MAX  })`;
  }
});

