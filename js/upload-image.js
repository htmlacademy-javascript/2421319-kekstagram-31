const FORMATS = ['jpg', 'jpeg', 'png', 'gif'];

const uploadFile = document.querySelector('.img-upload__input');
const image = document.querySelector('.img-upload__preview > img');
const effectList = document.querySelector('.effects__list');
const effectPreview = effectList.querySelectorAll('span');

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FORMATS.some((it) => fileName.endsWith(it));

  if (matches) {
    image.src = URL.createObjectURL(file);

    effectPreview.forEach((evt) => {
      evt.style.backgroundImage = `url(${image.src})`;
    });
  }
});

