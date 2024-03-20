import {closeOnEscKeyDown} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img');
const closeButton = document.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onBigPictureEscKeyDown = (evt) => {
  closeOnEscKeyDown(evt, () => {
    closeBigPicture();

    document.removeEventListener('keydown', onBigPictureEscKeyDown);
  });
};

const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscKeyDown);
};

const showBigPicture = (picture) => {
  const {url, description, likes, comments} = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  pictureCaption.textContent = description;
  likesCount.textContent = likes;

  document.addEventListener('keydown', onBigPictureEscKeyDown);
  closeButton.addEventListener('click', onCloseBigPictureClick);
};

export {showBigPicture};

