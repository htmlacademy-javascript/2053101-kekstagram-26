import { isEsc } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const newError = errorTemplate.cloneNode(true);
const errorButton = newError.querySelector('.error__button');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

// Обработчик на esc keydown
const onErrorModalEscKeydown = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

// Обработчик на click вне формы
const onOutOfErrorModal = (evt) => {
  if(evt.target ===  newError) {
    closeErrorModal();
  }
};

function openErrorModal() {
  document.body.append(newError);
  errorButton.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  newError.addEventListener('click', onOutOfErrorModal);
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.add('modal-open');
}

function closeErrorModal() {
  newError.remove();
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.remove('modal-open');

}

export { openErrorModal };
