import { isEsc, testUnique, checkStringLength } from './util.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFileClose = document.querySelector('#upload-cancel');

const modalEscKeydownHandler = (evt) => {debugger;
  if(isEsc(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadOverlay.addEventListener('keydown', modalEscKeydownHandler);
}

function closeModal() {debugger
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadOverlay.removeEventListener('keydown', modalEscKeydownHandler);
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
  (value) => hashtags(value).length <= 5,
  'Хэштегов должно быть не более 5-ти'
);

pristine.addValidator(hashtagInput,
  (value) => hashtags(value).every((item) => /^#[A-Za-zА-Яа-яЁё0-9'']{1,19}$/.test(item)),
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
  // debugger;
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

