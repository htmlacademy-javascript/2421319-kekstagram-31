import {debounce, shuffleArray} from './util.js';
import {renderPhotos, removePictures} from './picture.js';

const COUNT_OF_FILTER = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onButtonClick = (evt) => {
  if(isButton(evt)) {
    const selectedButton = imgFiltersForm.querySelector(`.${ACTIVE_CLASS}`);
    selectedButton.classList.toggle(`${ACTIVE_CLASS}`);
    evt.target.classList.toggle(`${ACTIVE_CLASS}`);
  }
};

const getFilterImages = (photos) => {
  const availableFilters = {
    'filter-default': () => photos.slice(),
    'filter-random': () => shuffleArray(photos.slice(0, COUNT_OF_FILTER)),
    'filter-discussed': () => photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length),
  };

  const onImgFiltersFormClick = debounce((evt) => {
    if (isButton(evt)) {
      removePictures();

      renderPhotos(availableFilters[evt.target.id]());
    }
  });

  imgFiltersForm.addEventListener('click', onImgFiltersFormClick);
  imgFiltersForm.addEventListener('click', onButtonClick);
};

export {getFilterImages};
