import { isEsc } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const newError = errorTemplate.cloneNode(true);
const errorButton = newError.querySelector('.error__button');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

// Обработчик на document на esc keydown
const onDocumentEscKeydown = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

// Обработчик на не по форме на click
const onNotNewError = (evt) => {
  if(evt.target ===  newError) {
    closeErrorModal();
  }
};

function openErrorModal() {
  document.body.append(newError);
  errorButton.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', onDocumentEscKeydown);
  newError.addEventListener('click', onNotNewError);
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.add('modal-open');
}

function closeErrorModal() {
  newError.remove();
  document.removeEventListener('keydown', onDocumentEscKeydown);
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.remove('modal-open');

}

export { openErrorModal };
