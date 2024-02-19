// 1 задание

const verifyStringLength = (string, maxLength) => maxLength >= string.length;

verifyStringLength('проверяемая строка', 22);
verifyStringLength('проверяемая строка', 18);
verifyStringLength('проверяемая строка', 10);


// 2 задание

const verifyPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let emptyString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    emptyString += normalizedString[i];
  }

  return emptyString === normalizedString;
};

verifyPalindrome('топот');
verifyPalindrome('ДовОд');
verifyPalindrome('Кекс');
verifyPalindrome('Лёша на полке клопа нашёл ');
verifyPalindrome(' Лёша на полу клопа нашёл ');


/* 2 вариант решения

const verifyPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let reverseString = normalizedString.split('').reverse().join('');
  return reverseString === normalizedString;
};

verifyPalindrome('топот');
verifyPalindrome('ДовОд');
verifyPalindrome('Кекс');
verifyPalindrome('Лёша на полке клопа нашёл ');
verifyPalindrome(' Лёша на полу клопа нашёл ');


Можно ли сокращать так?

const verifyPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  return normalizedString === normalizedString.split('').reverse().join('');
};

*/
