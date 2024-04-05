import {renderPhotos} from './picture.js';
import {initUploadModal, onUploadFormSubmit} from './form.js';
import './effects.js';
import {loadData} from './fetch.js';
import {getFilterImages} from './filters.js';
import './upload-image.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.top = '15px';
  messageAlert.style.right = 0;
  messageAlert.style.left = 0;
  messageAlert.style.padding = '10px 0';
  messageAlert.style.fontSize = '20px';
  messageAlert.style.fontWeight = 800;
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фотографий';
  document.body.append(messageAlert);
};

loadData(onSuccess, onError);
initUploadModal();
onUploadFormSubmit();
getFilterImages(photos);
