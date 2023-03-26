const ru = {
  translation: {
    appName: 'EasyWeatherApp',
    city: 'Город',
    exampleCity: 'Москва',
    feelsLike: 'Ощущается как {{temp}}',
    maxMinTemp: 'Макс. {{max}}, мин. {{min}}',
    pressureValue: '{{value}} мм рт. ст.',
    timeNow: 'Сейчас {{time}}',
    humidity: 'Влажность',
    pressure: 'Атмосферное давление',
    today: 'Сегодня',
    noResults: 'Нет результатов',
    wind: {
      wind: 'Ветер',
      speedAndDirection: '{{speed}} м/с, {{direction}}',
      directions: {
        N: 'С',
        NE: 'СВ',
        E: 'В',
        SE: 'ЮВ',
        S: 'Ю',
        SW: 'ЮЗ',
        W: 'З',
        NW: 'СЗ'
      },
    },
    i18n: {
      selectLanguage: 'Выберите язык',
      languageName: 'Русский'
    },
    errors: {
      noCityWithEnteredName: 'Город с указанным названием не найден',
      requestError: 'Что-то пошло не так...',
      cityNameIsRequired: 'Введите название города'
    },
  },
};

export default ru;
