import { isEsc } from './util.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const newSuccessElement = successTemplateElement.cloneNode(true);
const successButtonElement = newSuccessElement.querySelector('.success__button');


// Обработчик на esc keydown
const onSuccessModalEscKeydown = (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

// Обработчик на click вне формы
const onOutOfSuccessModal = (evt) => {
  if(evt.target ===  newSuccessElement) {
    closeSuccessModal();
  }
};

function openSuccessModal() {
  document.body.append(newSuccessElement);
  successButtonElement.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  newSuccessElement.addEventListener('click', onOutOfSuccessModal);
}

function closeSuccessModal() {
  newSuccessElement.remove();
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
}

export { openSuccessModal };
