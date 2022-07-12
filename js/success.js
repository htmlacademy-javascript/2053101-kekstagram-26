import { isEsc } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const newSuccess = successTemplate.cloneNode(true);
const successButton = newSuccess.querySelector('.success__button');


// Обработчик на document на esc keydown
const onDocumentEscKeydown = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

// Обработчик на не по форме на click
const onNotNewSuccess = (evt) => {
  if(evt.target.className ===  'success') {
    closeSuccessModal();
  }
};

function openSuccessModal() {
  document.body.append(newSuccess);
  successButton.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onNotNewSuccess);
}

function closeSuccessModal() {
  newSuccess.remove();
  document.removeEventListener('keydown', onDocumentEscKeydown);
  // Удалить обработчик на клик не по форме
}


export { openSuccessModal, closeSuccessModal };
