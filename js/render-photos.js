import {renderPhoto} from './picture.js';
import {getFilterImages} from './filters.js';

const pictures = document.querySelector('.pictures');

let photos = [];

const fragment = document.createDocumentFragment();

const renderPhotos = (objects) => {
  objects.forEach((item) => {
    fragment.appendChild(renderPhoto(item));
  });

  pictures.appendChild(fragment);
};

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

getFilterImages(photos);

export {renderPhotos, onSuccess, onError};
