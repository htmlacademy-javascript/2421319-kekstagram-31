const DESCRIPTION = [
  'Как вообще можно сделать хорошее селфи?',
  'Пример того, к чему приводят мечты. А о чем мечтаете вы?',
  'Временно в режиме «офф-лайн».',
  'Я рожден, чтобы сиять… и делать селфи!',
  'Доброе утро, мир, вот мое селфи, которое ты так отчаянно просил.',
  'Это было нелегко, но оно того стоило.'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Tanya',
  'Karen',
  'Theodore',
  'Lydia',
  'Margaret',
  'Justin'
];

const SIMILAR_COMMENTS_COUNT = 30;
const SIMILAR_OBJECTS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: getRandomInteger(1, 25),
  avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME),
});

const createPublication = () => ({
  id: getRandomInteger(1, 25),
  url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, SIMILAR_COMMENTS_COUNT)}, createComment),
});

const objectPublication = Array.from({length: SIMILAR_OBJECTS_COUNT}, createPublication);

console.log(objectPublication);


