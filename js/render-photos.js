import {renderPhoto} from './picture.js';
import {getFilterImages} from './filters.js';
import {loadData} from './fetch.js';

const pictures = document.querySelector('.pictures');

let photos = [];

const fragment = document.createDocumentFragment();

const renderPhotos = (objects) => {
  objects.forEach((item) => {
    fragment.appendChild(renderPhoto(item));
  });

  pictures.appendChild(fragment);

  getFilterImages(photos);
};

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onError = () => {
  const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
  const messageDataError = dataError.cloneNode(true);
  document.body.appendChild(messageDataError);
};

loadData(onSuccess, onError);

export {renderPhotos};
