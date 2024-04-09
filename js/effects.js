const Effects = {
  LEVEL: 100,
  RADIX: 10,
  STEP: 0.01,
  MAX_BLUR: 3,
  MAX_BRIGHTNESS: 3,
};

const Sliders = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const imagePreview = uploadForm.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');

let currentEffect = '';

effectLevelValue.value = Effects.LEVEL;

effectLevel.classList.add('visually-hidden');

const effects = {
  none: () => {
    effectLevel.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    effectLevel.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValue.value, Effects.RADIX) * Effects.STEP})`;
  },
  sepia: () => {
    effectLevel.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue.value, Effects.RADIX) * Effects.STEP})`;
  },
  marvin: () => {
    effectLevel.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValue.value)}%)`;
  },
  phobos: () => {
    effectLevel.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectLevelValue.value, Effects.RADIX) * Effects.MAX_BLUR) * Effects.STEP}px)`;
  },
  heat: () => {
    effectLevel.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectLevelValue.value, Effects.RADIX) * Effects.MAX_BRIGHTNESS) * Effects.STEP})`;
  },
};

const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    if(currentEffect !== '') {
      image.classList.remove(currentEffect);
    }

    slider.noUiSlider.set(Sliders.MAX);
    effectLevelValue.value = Sliders.MAX;

    currentEffect = target.classList[1];
    image.classList.add(currentEffect);
    // effectsInput.setAttribute('checked', '');
    image.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

noUiSlider.create(slider, {
  start: Sliders.MAX,
  step: Sliders.STEP,
  connect: 'lower',
  range: {
    'min': Sliders.MIN,
    'max': Sliders.MAX
  }
});

slider.noUiSlider.on('change', () => {
  effectLevelValue.value = slider.noUiSlider.get();

  image.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
});

export {effects};
