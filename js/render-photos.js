const pictureTemplateElement = document.querySelector('#picture').content.querySelector('a');
const photoAlbumFragment = document.createDocumentFragment();
const picturesContainerElement = document.querySelector('.pictures');

const renderPhotos = (photos) => {
  // Если есть старые фото, то их удаляем
  const oldPictures = document.querySelectorAll('.picture');
  if(oldPictures.length) {
    oldPictures.forEach((element) => {
      element.remove();
    }
    );
  }
  photos.forEach((photo, photoIndex) => {
    const newPictureElement = pictureTemplateElement.cloneNode(true);
    newPictureElement.querySelector('.picture__img').src = photo.url;
    newPictureElement.querySelector('.picture__likes').textContent = photo.likes;
    newPictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    // Добавляем data-атрибут картинке
    newPictureElement.dataset.index = photoIndex;
    photoAlbumFragment.append(newPictureElement);
  });
  picturesContainerElement.append(photoAlbumFragment);
};

export {renderPhotos};
