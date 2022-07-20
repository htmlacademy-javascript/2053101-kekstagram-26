
// Максимальное количество символов в комментарии
const MAX_SYMBOLS = 140;
// Максимальное количество хештегов
const MAX_HASHTAGS = 5;
// Количество отображаемых комментариев при отрисовке большого фото
const SOCIAL_COMMENTS_STEP = 5;
// Количество случайных фото
const RANDOM_PHOTOS = 10;
// Задержка для устранения дребезга (мс)
const RERENDER_DELAY = 500;
// Время отображения сообщения об ошибке
const ALERT_SHOW_TIME = 5000;

// Предустановки слайдера в зависимости от выбранного эффекта
const EFFECTS = [
  // ХРОМ
  { effect: 'effects__preview--chrome',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  // СЕПИЯ
  { effect: 'effects__preview--sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  // МАРВИН
  { effect: 'effects__preview--marvin',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  // ФОБОС
  { effect: 'effects__preview--phobos',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  // ЗНОЙ
  { effect: 'effects__preview--heat',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
  },
];

// Предустановки для масштабирования превью фото
const SCALE_STEP = 25;
const  SCALE_MAX = 100;

export { ALERT_SHOW_TIME, MAX_SYMBOLS, MAX_HASHTAGS, EFFECTS, SCALE_STEP, SCALE_MAX, SOCIAL_COMMENTS_STEP, RANDOM_PHOTOS, RERENDER_DELAY };
