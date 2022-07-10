import { createPhoto } from './create-photo.js';
import './user-modal.js';
import './effect.js';
import './scale.js';

// createBigPhoto();

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    console.log(photos);
    createPhoto(photos);
  })
