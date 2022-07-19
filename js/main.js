import { renderPhotos } from './render-photos.js';
import './user-modal.js';
import './effect.js';
import './scale.js';
import { getData } from './api.js';
import { setImgFormSubmit } from './user-modal.js';


getData((photos) => renderPhotos(photos));

setImgFormSubmit();
