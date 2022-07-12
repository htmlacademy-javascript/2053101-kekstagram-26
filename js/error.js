import { isEsc } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const newError = errorTemplate.cloneNode(true);
const errorButton = newError.querySelector('.error__button');

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
}

function closeErrorModal() {
  newError.remove();
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

export { openErrorModal };
