import {getRandomInteger, getRandomArrayElement} from './util.js';

const COUNT = 25;

const DESCRIPTIONS = [
  'Как вообще можно сделать хорошее селфи?',
  'Пример того, к чему приводят мечты. А о чем мечтаете вы?',
  'Временно в режиме «офф-лайн».',
  'Я рожден, чтобы сиять… и делать селфи!',
  'Доброе утро, мир, вот мое селфи, которое ты так отчаянно просил.',
  'Это было нелегко, но оно того стоило.'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Tanya',
  'Karen',
  'Theodore',
  'Lydia',
  'Margaret',
  'Justin'
];

const photos = [];

const Likes = {
  MIN: 15,
  MAX: 200
};

const Avatars = {
  MIN: 1,
  MAX: 6
};

const Comments = {
  MIN: 1,
  MAX: 30
};

const addComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(Avatars.MIN, Avatars.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const addComments = () => {
  const comments = [];
  for (let i = 1; i <= getRandomInteger(Comments.MIN, Comments.MAX); i++) {
    comments.push(addComment(i));
  }
  return comments;
};

const addPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: addComments(),
});

const addPhotos = () => {
  for (let i = 1; i <= COUNT; i++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();

export {photos};

