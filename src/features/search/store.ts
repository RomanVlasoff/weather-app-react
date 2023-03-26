import { createStore, createEvent, createEffect, split, sample } from 'effector';
import { getCitiesByLocationName, getWeatherForLocation } from '@/services/api';
import type { LocationDataWithId, CityWeatherData } from '@/services/api/types';
import { debounce } from 'patronum/debounce';

const DEBOUNCE_TIMEOUT_IN_MS = 300;

// EVENTS ===========

const searchTextChanged = createEvent<string>();
const searchTextReset = createEvent();
const searchCity = createEvent<string>();
const citySelected = createEvent<LocationDataWithId | null>();
const cityReset = createEvent();
const citiesReset = createEvent();

// EFFECTS ===========

const fetchCitiesByNameFx = createEffect((cityName: string) => {
  return getCitiesByLocationName(cityName);
});

const fetchCityWeatherFx = createEffect((city: LocationDataWithId | null) => {
  console.log('fetchCityWeatherFx', city);
  if (!city) {
    return Promise.reject();
  }
  return getWeatherForLocation({ lon: city.lon, lat: city.lat });
});

// STORES ===========

const $searchText = createStore('')
  .on(searchTextChanged, (_, newValue) => newValue)
  .reset(searchTextReset);

const $cities = createStore<LocationDataWithId[]>([])
  .on(
    fetchCitiesByNameFx.doneData,
    (_state, payload) => {
      return payload.data
        // Добавляем поле id в элементы списка городов
        .map((item) => ({ ...item, id: `id_${item.lat}_${item.lon}` }));
    },
  )
  .reset([citiesReset, fetchCitiesByNameFx.fail]);

// Текущий выбранный город из $cities
const $selectedCity = createStore<LocationDataWithId | null>(null)
  .on(citySelected, (_, newValue) => newValue)
  .reset(cityReset);

// Инф-я и погода в текущем городе
const $currentCityWeather = createStore<CityWeatherData | null>(null)
  .on(
    fetchCityWeatherFx.doneData,
    (_state, payload) => {
      return payload.data;
    },
  )
  .reset([cityReset, fetchCityWeatherFx.fail]);

// ЛОГИКА ===========

// При изменении строки ищем такой город
debounce({
  source: searchTextChanged,
  timeout: DEBOUNCE_TIMEOUT_IN_MS,
  target: searchCity,
});

// При поиске города - если строка пустая, просто сбрасываем список городов, иначе - делаем запрос
split({
  source: searchCity,
  match: (text: string) => text ? 'fetch' : 'clear',
  cases: {
    clear: citiesReset,
    fetch: fetchCitiesByNameFx,
  },
});

sample({
  source: $selectedCity,
  filter: (value) => !!value,
  target: fetchCityWeatherFx,
});

export {
  $searchText,
  $cities,
  $selectedCity,
  $currentCityWeather,
  searchTextChanged,
  citySelected,
};
