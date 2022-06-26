import { createPhotoAlbum } from './create-photo-album.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('a');
const photoAlbum = createPhotoAlbum();
const photoAlbumFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const createPhoto = () => {photoAlbum.forEach((element, index) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = element.url;
  newPicture.querySelector('.picture__likes').textContent = element.likes;
  newPicture.querySelector('.picture__comments').textContent = element.comments.length;
  // Добавляем data-атрибут картинке
  newPicture.dataset.index = index;
  photoAlbumFragment.append(newPicture);
});
picturesContainer.append(photoAlbumFragment);
};
console.log(photoAlbum)
export {createPhoto, photoAlbum};
