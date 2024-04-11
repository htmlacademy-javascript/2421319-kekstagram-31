const DELAY = 500;

const isEscKey = (evt) => evt.key === 'Escape';

const getDeclination = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num >= 5 && num <= 20 || num % 100 >= 5 && num % 100 <= 20) {
    return genitivePlural;
  }
  if (num % 10 === 1 && num % 100 !== 11) {
    return nominative;
  }
  if (num % 10 > 1 && num % 10 < 5) {
    return genitiveSingular;
  }

  return genitivePlural;
};

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export {isEscKey, getDeclination, debounce, shuffleArray};
