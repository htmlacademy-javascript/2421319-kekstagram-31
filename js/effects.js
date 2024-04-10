const Effects = {
  RADIX: 10,
  LEVEL: 100,
  STEP: 0.01,
  MAX_BLUR: 3,
  MAX_BRIGHTNESS: 3,
};

const Sliders = {
  MIN: 0,
  MAX: 100,
  STEP: 10,
  STEP_INVERT: 1,
};

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const imagePreview = uploadForm.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const effectMarvin = uploadForm.querySelector('#effect-marvin');

let currentEffect = '';

effectLevel.classList.add('visually-hidden');

effectLevelValue.value = Effects.LEVEL;

const effects = {
  none: () => {
    effectLevelValue.value = 0;
    effectLevel.classList.add('visually-hidden');
    return 'none';
  },
  chrome: (value) => {
    const effect = parseInt(value, Effects.RADIX) * Effects.STEP;
    effectLevel.classList.remove('visually-hidden');
    console.log(effect);
    return `grayscale(${Number.isInteger(effect) ? effect : effect.toFixed(1)})`;
  },
  sepia: (value) => {
    const effect = parseInt(value, Effects.RADIX) * Effects.STEP;
    effectLevel.classList.remove('visually-hidden');
    console.log(effect);
    return `sepia(${effect.toFixed(1)})`;
  },
  marvin: (value) => {
    const effect = Math.floor(value);
    effectLevel.classList.remove('visually-hidden');
    console.log(effect);
    return `invert(${effect}%)`;
  },
  phobos: (value) => {
    const effect = (parseInt(value, Effects.RADIX) * Effects.MAX_BLUR) * Effects.STEP;
    effectLevel.classList.remove('visually-hidden');
    console.log(effect);
    return `blur(${Number.isInteger(effect) ? effect : effect.toFixed(1)}px)`;
  },
  heat: (value) => {
    const effect = (parseInt(value, Effects.RADIX) * Effects.MAX_BRIGHTNESS) * Effects.STEP;
    effectLevel.classList.remove('visually-hidden');
    console.log(effect);
    return `brightness(${Number.isInteger(effect) ? effect : effect.toFixed(1)})`;
  },
};

noUiSlider.create(slider, {
  start: Sliders.MAX,
  step: Sliders.STEP,
  connect: 'lower',
  range: {
    'min': Sliders.MIN,
    'max': Sliders.MAX
  }
});

const updateSlider = (step, max) => {
  slider.noUiSlider.updateOptions({
    'max': max,
    step: step,
  });
};

const onEffectMarvinClick = () => updateSlider(Sliders.STEP_INVERT);

effectMarvin.addEventListener('click', onEffectMarvinClick);

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

    currentEffect = target.classList[1];
    image.classList.add(currentEffect);
    image.style.filter = effects[currentEffect.replace('effects__preview--', '')](slider.noUiSlider.get());
  }
};

slider.noUiSlider.on('change', () => {
  image.style.filter = effects[currentEffect.replace('effects__preview--', '')](slider.noUiSlider.get());
});

effectsList.addEventListener('click', onEffectsListClick);

export {effects};
