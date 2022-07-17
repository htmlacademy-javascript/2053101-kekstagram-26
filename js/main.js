import { renderBigPhoto } from './render-big-photo.js';
import './user-modal.js';
import './effect.js';
import './scale.js';
import { getData } from './api.js';
import { setImgFormSubmit } from './user-modal.js';
import { setImgFilters } from './filter.js';


getData((photos) => setImgFilters(photos));

setImgFormSubmit();
