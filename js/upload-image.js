const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const uploadFile = document.querySelector('.img-upload__input');
const image = document.querySelector('.img-upload__preview > img');
const effectList = document.querySelector('.effects__list');
const effectPreview = effectList.querySelectorAll('span');

const onUploadPhotoChange = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      image.src = reader.result;
      effectPreview.forEach((evt) => {
        evt.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
};

export {onUploadPhotoChange};