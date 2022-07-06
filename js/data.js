// Количество фотографий в альбоме
const NUMBER_ID_PHOTOS = 25;
// Максимальное количество символов в комментарии
const MAX_SYMBOLS = 140;
// Максимальное количество хештегов
const MAX_HASHTAGS = 5;

// Описания фотографий
const DESCRIPTIONS = [
  'Вид из номера',
  'Указатель на пляж',
  'Лазурный берег',
  'Женщина с фотоаппаратом',
  'Гуляш с рисом',
  'Ламба',
  'Дольки клубники',
  'Виноградный сок',
  'Самолет, привет!',
  'Полка для обуви',
  'Проход на пляж',
  'Ауди',
  'Морской обед',
  'Котши',
  'Relax',
  'В облаках',
  'Хор',
  'Ретро авто',
  'Тапочки с подсветкой',
  'Пальмы',
  'Тушеное мясо с лаймом',
  'Закат над морем',
  'Краб',
  'Руки вверх',
  'Гиппопотам vs внедрожоник'
];
  // КОММЕНТАРИИ И КОММЕНТАТОРЫ
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Михаил',
  'Евлампий',
  'Аврора',
  'Эсмиральда',
  'Сальвадор',
  'Кассиопея',
  'Рогнеда',
  'Кристина',
  'Ольга',
  'Ганс',
  'Энрике',
  'Жозефина',
  'Геннадий',
  'Лев',
  'Дормидонт',
];

// Предустановки слайдера в зависимости от выбранного эффекта
const EFFECTS = [
  // ХРОМ
  { effect: 'effects__preview--chrome',
    min: 0,
    max: 1,
    step: 0.1,
  },
  // СЕПИЯ
  { effect: 'effects__preview--sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  // МАРВИН
  { effect: 'effects__preview--marvin',
    min: 0,
    max: 100,
    step: 1,
  },
  // ФОБОС
  { effect: 'effects__preview--phobos',
    min: 0,
    max: 3,
    step: 0.1,
  },
  // ЗНОЙ
  { effect: 'effects__preview--heat',
    min: 1,
    max: 3,
    step: 0.1,
  },
];

export {DESCRIPTIONS, MESSAGES, NAMES, NUMBER_ID_PHOTOS, MAX_SYMBOLS, MAX_HASHTAGS, EFFECTS};
