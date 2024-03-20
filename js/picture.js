const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (picture) => {
  const {url, description, comments, likes} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  return pictureElement;
};

const fragment = document.createDocumentFragment();

const renderPhotos = (objects) => {
  objects.forEach((item) => {
    fragment.appendChild(renderPhoto(item));
  });

  pictures.appendChild(fragment);
};

export {renderPhotos};
