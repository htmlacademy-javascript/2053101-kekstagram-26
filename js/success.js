import { isEsc } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const newSuccess = successTemplate.cloneNode(true);
const successButton = newSuccess.querySelector('.success__button');


// Обработчик на esc keydown
const onSuccessModalEscKeydown = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

// Обработчик на click вне формы
const onOutOfSuccessModal = (evt) => {
  if(evt.target ===  newSuccess) {
    closeSuccessModal();
  }
};

function openSuccessModal() {
  document.body.append(newSuccess);
  successButton.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  newSuccess.addEventListener('click', onOutOfSuccessModal);
}

function closeSuccessModal() {
  newSuccess.remove();
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
}

export { openSuccessModal };
