import { showAlert } from './util.js';
import { openSuccessModal } from './success.js';

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
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
        openSuccessModal();
      } else {
        showAlert('Не удалось отправить форму');
      }
    })
    .catch(() => {
      onFail('onfail');
    });

};

export { getData, sendData };
