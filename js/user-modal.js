import { isEsc, testUnique, checkStringLength } from './util.js';
import { MAX_HASHTAGS, MAX_SYMBOLS } from './data.js';
import { closeSliderElement } from './effect.js';
import { openSuccessModal } from './success.js';
import { openErrorModal } from './error.js';
import { sendData } from './api.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFileClose = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textDescription = document.querySelector('.text__description');
const hashtagInput = document.querySelector('.text__hashtags');
const uploadButton = document.querySelector('.img-upload__submit');


// Обработчик на esc
const onEscKeydown = (evt) => {
  if(isEsc(evt)) {
    const activeElementClassName = document.activeElement.className;
    if(activeElementClassName !== 'text__hashtags' &&
    activeElementClassName !== 'text__description' &&
    document.body.lastChild.className !== 'error'){ // Проверка на наличие ошибки при отправке фото
      evt.preventDefault();
      closeModal();
    }
  }
};

function openModal() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

function closeModal() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  uploadImageForm.reset();
  closeSliderElement();
}

uploadFile.addEventListener('change', () => openModal());

uploadFileClose.addEventListener('click', () => closeModal());

// Настройка pristine
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// Валидация хэштегов
const hashtags = (value) => value.toLowerCase().split(' ');

pristine.addValidator(hashtagInput,
  (value) => hashtags(value).length <= MAX_HASHTAGS,
  'Хэштегов должно быть не более 5-ти'
);

const isHashtagValid = (value) => {
  const re = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/i;
  const arr = value.split(' ');
  for (const arrElem of arr) {
    if (!re.test(arrElem) && arrElem !== '') {
      return false;
    }
  } return true;
};

pristine.addValidator(hashtagInput,
  (value) => isHashtagValid(value),
  'Хэштег должен начинаться с # и не должен  содержать пробелы, спецсимволы (#, @, $ и т. п.)'
);

pristine.addValidator(hashtagInput,
  (value) => testUnique(hashtags(value)),
  'Хэштеги не должны повторяться'
);

// Валидация комментариев
pristine.addValidator(textDescription,
  (value) => checkStringLength(value, MAX_SYMBOLS),
);

// Обработчик на блокировку/разблокировку кнопки отправки формы
// при вводе данных в хештег и описание
const onInputHashtagDescription = () => {
  const isValid = pristine.validate();
  if(!isValid) {
    uploadButton.disabled = true;
  } else {
    uploadButton.disabled = false;
  }
};

hashtagInput.addEventListener('input', onInputHashtagDescription);

textDescription.addEventListener('input', onInputHashtagDescription);

// Обработчик на отправку данных формы
const setImgFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(openSuccessModal, openErrorModal, new FormData(evt.target));

  });
};

export { closeModal, setImgFormSubmit };
