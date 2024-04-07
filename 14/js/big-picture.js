import {isEscKey, numDecline} from './util.js';

const COOMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.social__comments-loader');

const commentFragment = document.createDocumentFragment();

let commentsCount = COOMENTS_STEP;
let currentComments = [];

const createComment = (comment) => {
  const newComment = document.createElement('li');
  const imgComment = document.createElement('img');
  const textComment = document.createElement('p');

  newComment.classList.add('social__comment');
  imgComment.classList.add('social__picture');
  textComment.classList.add('social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.message;

  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);

  commentFragment.appendChild(newComment);
};

const renderComments = () => {
  socialComments.innerHTML = '';
  socialCommentsCount.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COOMENTS_STEP || commentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.innerHTML = `<span class="social__comment-shown-count">${commentsCount}</span> из <span class="social__comment-total-count">${currentComments.length}</span> ${numDecline(currentComments.length, 'комментария', 'комментариев', 'комментариев')}`;

  commentsSelected.forEach(createComment);

  socialComments.appendChild(commentFragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  commentsCount = COOMENTS_STEP;
  currentComments = [];
};

const onBigPictureEscKeyDown = (evt) => {
  if (isEscKey(evt)) {
    closeBigPicture();

    document.removeEventListener('keydown', onBigPictureEscKeyDown);
  }
};

const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscKeyDown);
};

const onLoadCommentsButtonClick = () => {
  commentsCount += COOMENTS_STEP;
  renderComments();
};

const showBigPicture = (picture) => {
  const {url, description, likes, comments} = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  pictureCaption.textContent = description;
  likesCount.textContent = likes;

  currentComments = comments.slice();

  renderComments();

  loadComments.addEventListener('click', onLoadCommentsButtonClick);

  document.addEventListener('keydown', onBigPictureEscKeyDown);
};

closeButton.addEventListener('click', onCloseBigPictureClick);

export {showBigPicture};
