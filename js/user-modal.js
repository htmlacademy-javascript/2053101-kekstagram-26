import { isEsc } from './util.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFileClose = document.querySelector('#upload-cancel');

const modalEscKeydownHandler = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadFile.addEventListener('keydown', modalEscKeydownHandler);
}

function closeModal() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.removeEventListener('keydown', modalEscKeydownHandler);
  uploadImageForm.reset();
}

uploadFile.addEventListener('change', () => openModal());

uploadFileClose.addEventListener('click', () => closeModal());

// Валидация формы pristine
const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Валидация хэштегов
const hashtagInput = document.querySelector('[name="hashtags"]');


pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Хэштег должен начинаться с # и не должен  содержать пробелы, спецсимволы (#, @, $ и т. п.)');

function validateHashtags (value) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashtags = value.split(' ');
  for(let i = 0; i < hashtags.length; i++) {
    if(!re.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  isValid ? console.log('ok') : console.log('not ok');
});

