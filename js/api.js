import { showAlert } from './util.js';
import { closeModal } from './user-modal.js';
import { setImgFilters } from './filter.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .then((photos) => {
      onSuccess(photos);
      setImgFilters(photos);
    })
    .catch(() => {
      showAlert('Сервер не доступен');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if(response.ok) {
        closeModal();
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });

};

export { getData, sendData };
