import { renderPhotos } from './render-photos.js';
import './user-modal.js';
import './effect.js';
import './scale.js';
import { getData } from './api.js';
import { setImgFormSubmit } from './user-modal.js';
import { setImgFilters } from './filter.js';
import { renderComments } from './render-big-photo.js';


getData((photos) => {
  renderPhotos(photos);
  setImgFilters(photos);
  renderComments(photos);
});

setImgFormSubmit();
