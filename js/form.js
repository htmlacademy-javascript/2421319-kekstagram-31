import {isEscKeyDown} from './util.js';
import {image, effects} from './effects.js';

const MAX_SYMBOLS = 20;
const MAX_SYMBOLS_DESCRIPTION = 140;
const MAX_HASHTAGS = 5;
const SCALE_STEP = 0.25;

const pageBody = document.querySelector('body');
const uploadForm = pageBody.querySelector('.img-upload__form');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const uploadSubmitButton = uploadForm.querySelector('#upload-submit');
const minusButton = uploadForm.querySelector('.scale__control--smaller');
const plusButton = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');

let errorMessage = '';
let scale = 1;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__input',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэштег не может повторяться',
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`,
    },
    {
      check: inputArray.some((item) => item[0] === '#' && item.length === 1),
      error: 'Хэштег не может состоять только из символа #',
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{0,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(hashtagInput, hashtagsHandler, error, 2, false);

const descriptionHandler = (value) => {
  errorMessage = '';

  const inputText = value;

  if (inputText.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputText.length > MAX_SYMBOLS_DESCRIPTION,
      error: `Максимальная длина комментария ${MAX_SYMBOLS_DESCRIPTION} символов`,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(descriptionInput, descriptionHandler, error, 2, false);

const onUploadFormInput = () => {
  if (pristine.validate()) {
    uploadSubmitButton.removeAttribute('disabled');
  } else {
    uploadSubmitButton.setAttribute('disabled', '');
  }
};

hashtagInput.addEventListener('input', onUploadFormInput);
descriptionInput.addEventListener('input', onUploadFormInput);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

const onPhotoEditorResetButtonClick = () => closePhotoEditor();

const onDocumentKeyDown = (evt) => {
  if (isEscKeyDown(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

const onMinusButtonClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

const onPlusButtonClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetButtonClick);
  uploadFileControl.value = '';
  image.style.transform = 'none';
  image.style.filter = effects.none();
}

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
};

export {initUploadModal};
