import { isEsc, testUnique, checkStringLength } from './util.js';
import { MAX_HASHTAGS, MAX_SYMBOLS, FILE_TYPES } from './data.js';
import { closeSliderElement } from './effect.js';
import { openSuccessModal } from './success.js';
import { openErrorModal } from './error.js';
import { sendData } from './api.js';


const uploadImageFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFileCloseElement = document.querySelector('#upload-cancel');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const textDescriptionElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');
const uploadButtonElement = document.querySelector('.img-upload__submit');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const submitButtonElement = document.querySelector('.img-upload__submit');

// Обработчик на esc
const onModalEscKeydown = (evt) => {
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
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
}

function closeModal() {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  uploadImageFormElement.reset();
  closeSliderElement();
  imgUploadPreviewElement.style.transform = '';
}

uploadFileElement.addEventListener('change', () => {
  openModal();
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));
  if (matches) {
    imgUploadPreviewElement.src = URL.createObjectURL(file);
  }
});

uploadFileCloseElement.addEventListener('click', () => closeModal());

// Настройка pristine
const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// Валидация хэштегов
const hashtags = (value) => value.toLowerCase().split(' ');

pristine.addValidator(hashtagInputElement,
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

pristine.addValidator(hashtagInputElement,
  (value) => isHashtagValid(value),
  'Хэштег должен начинаться с # и не должен  содержать пробелы, спецсимволы (#, @, $ и т. п.)'
);

pristine.addValidator(hashtagInputElement,
  (value) => testUnique(hashtags(value)),
  'Хэштеги не должны повторяться'
);

// Валидация комментариев
pristine.addValidator(textDescriptionElement,
  (value) => checkStringLength(value, MAX_SYMBOLS),
);

// Обработчик на блокировку/разблокировку кнопки отправки формы
// при вводе данных в хештег и описание
const onInputHashtagAndDescription = () => {
  const isValid = pristine.validate();
  if(!isValid) {
    uploadButtonElement.disabled = true;
  } else {
    uploadButtonElement.disabled = false;
  }
};

hashtagInputElement.addEventListener('input', onInputHashtagAndDescription);

textDescriptionElement.addEventListener('input', onInputHashtagAndDescription);


const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправляется...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

// Обработчик на отправку данных формы
const setImgFormSubmit = () => {
  imgUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(
      () => {
        openSuccessModal();
        unblockSubmitButton();
      },
      () => {
        openErrorModal();
        unblockSubmitButton();
      },
      new FormData(evt.target));

  });
};

export { closeModal, setImgFormSubmit };
