import { isEsc } from './util.js';

const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const newErrorElement = errorTemplateElement.cloneNode(true);
const errorButtonElement = newErrorElement.querySelector('.error__button');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

// Обработчик на esc keydown
const onErrorModalEscKeydown = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

// Обработчик на click вне формы
const onOutOfErrorModal = (evt) => {
  if(evt.target ===  newErrorElement) {
    closeErrorModal();
  }
};

function openErrorModal() {
  document.body.append(newErrorElement);
  errorButtonElement.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  newErrorElement.addEventListener('click', onOutOfErrorModal);
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.add('modal-open');
}

function closeErrorModal() {
  newErrorElement.remove();
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.remove('modal-open');

}

export { openErrorModal };
