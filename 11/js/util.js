const getRandomInteger = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscKeyDown = (evt) => evt.key === 'Escape';

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
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

export {getRandomInteger, getRandomArrayElement, isEscKeyDown, numDecline};
