import { renderBigPhoto } from './render-big-photo.js';
import './user-modal.js';
import './effect.js';
import './scale.js';
import { getData } from './api.js';

// createBigPhoto();

getData((photos) => renderBigPhoto(photos));

