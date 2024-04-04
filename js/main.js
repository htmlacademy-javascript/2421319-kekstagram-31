import {renderPhotos} from './picture.js';
import {initUploadModal, onUploadFormSubmit} from './form.js';
import './effects.js';
import {loadData} from './fetch.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
};

const onError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.left = 0;
  messageAlert.style.padding = '15px 0';
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фотографий';
  document.body.append(messageAlert);
};

loadData(onSuccess, onError);
initUploadModal();
onUploadFormSubmit();
