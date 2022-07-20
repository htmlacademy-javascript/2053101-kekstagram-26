const pictureTemplate = document.querySelector('#picture').content.querySelector('a');
const photoAlbumFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const renderPhotos = (photos) => {
  // Если есть старые фото, то их удаляем
  const oldPictures = document.querySelectorAll('.picture');
  if(oldPictures.length) {
    oldPictures.forEach((element) => {
      element.remove();
    }
    );
  }
  photos.forEach((element, index) => {
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

export {renderPhotos};
