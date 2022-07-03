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

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtags = document.querySelector('[name="hashtags"]');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__hashtags',
  errorTextParent: 'img-upload__hashtags',
  errorTextClass: '.form__error'
});

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  isValid ? console.log('ok') : console.log('not ok');
});


// ^#[A-Za-zА-Яа-яЁё0-9]{1,19}$