const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
let scaleControlNumber = Number(scaleControlValue.value.replace(/%/g,''));
const imgUploadPreview = document.querySelector('.img-upload__preview');

scaleControlBigger.addEventListener('click', () => {
  if (scaleControlNumber < 100) {
    scaleControlNumber += 25;
    scaleControlValue.value = `${ scaleControlNumber }%`;
    imgUploadPreview.style.transform = `scale(${  scaleControlNumber / 100  })`;
  }
});

scaleControlSmaller.addEventListener('click', () => {
  if (scaleControlNumber > 25) {
    scaleControlNumber -= 25;
    scaleControlValue.value = `${ scaleControlNumber }%`;
    imgUploadPreview.style.transform = `scale(${  scaleControlNumber / 100  })`;
  }
});
