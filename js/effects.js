const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const imgUploadWrapperNode = document.querySelector('.img-upload__wrapper');
const sliderNode = imgUploadWrapperNode.querySelector('.effect-level__slider');
const effectLevelNode = imgUploadWrapperNode.querySelector('.img-upload__effect-level');
const effectLevelValueNode = imgUploadWrapperNode.querySelector('.effect-level__value');
const imgNode = imgUploadWrapperNode.querySelector('.img-upload__preview img');

const effects = {
  none: { min: 0, max: 1, start: 1, step: 0, styleFilter: 'none', unit: '' },
  chrome: { min: 0, max: 1, start: 1, step: 0.1, styleFilter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, start: 1, step: 0.1, styleFilter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, start: 100, step: 1, styleFilter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, start: 3, step: 0.1, styleFilter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, start: 3, step: 0.1, styleFilter: 'brightness', unit: '' },
};

effectLevelNode.classList.add('hidden');

noUiSlider.create(sliderNode, {
  start: 0,
  range: { min: 0, max: 1 },
  connect: 'lower',
  format: {
    from: (value) => parseFloat(value),
    to: (value) => Number.isInteger(value)
      ? value
      : value.toFixed(1),
  },
});

const setEffect = (effect) => {
  const { min, max, start, step, styleFilter, unit } = effect;

  sliderNode.noUiSlider.off('update');
  sliderNode.noUiSlider.updateOptions({
    start,
    step,
    range: { min, max },
  });
  sliderNode.noUiSlider.on('update', () => {
    effectLevelValueNode.value = sliderNode.noUiSlider.get();
    imgNode.style.filter = `${styleFilter}(${effectLevelValueNode.value}${unit})`;
  });
};

const onEffectChange = (evt) => {
  const effect = evt.target.value;
  imgNode.style.filter = '';

  if (effect === 'none') {
    effectLevelNode.classList.add('hidden');
  } else {
    effectLevelNode.classList.remove('hidden');
  }
  setEffect(effects[effect]);
};

effectsList.addEventListener('change', onEffectChange);

