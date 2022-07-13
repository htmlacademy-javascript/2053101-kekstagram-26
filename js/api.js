import { showAlert } from './util.js';
import { closeModal } from './user-modal.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Сервер не доступен');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram1',
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
        closeModal();
        onFail();
        // showAlert('Не удалось отправить форму');
        // onFail();
      }
    })
    .catch(() => {
      closeModal();
      onFail();
    });

};

export { getData, sendData };
