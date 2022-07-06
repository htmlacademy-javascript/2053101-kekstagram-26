import { isEsc, testUnique, checkStringLength } from './util.js';
import { MAX_HASHTAGS } from './data.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFileClose = document.querySelector('#upload-cancel');

const modalEscKeydownHandler = (evt) => {
  if(isEsc(evt)) {
    const activeElementClassName = document.activeElement.className;
    if(activeElementClassName !== 'text__hashtags' && activeElementClassName !== 'text__description'){
      evt.preventDefault();
      closeModal();
    }
  }
};

function openModal() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', modalEscKeydownHandler);
}

function closeModal() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', modalEscKeydownHandler);
  uploadImageForm.reset();
}

uploadFile.addEventListener('change', () => openModal());

uploadFileClose.addEventListener('click', () => closeModal());

// Настройка pristine
const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// Валидация хэштегов
const hashtagInput = document.querySelector('.text__hashtags');
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
const textDescription = document.querySelector('.text__description');

pristine.addValidator(textDescription,
  (value) => checkStringLength(value, 140),
  // 'Количество символов в комментарии должно быть не более 140'
);

const uploadButton = document.querySelector('.img-upload__submit');

const inputHashtagDescriptionHandler = (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {
    evt.preventDefault();
    uploadButton.disabled = true;
  } else {
    uploadButton.disabled = false;
  }
};

hashtagInput.addEventListener('input', inputHashtagDescriptionHandler);
textDescription.addEventListener('input', inputHashtagDescriptionHandler);
