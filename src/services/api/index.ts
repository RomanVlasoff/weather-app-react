import axios from "../axios";
import { AxiosResponse } from "axios";
import type {
  LocationData,
  CityWeatherData,
} from './types';

const API_KEY = process.env.REACT_APP_API_KEY;

export function getCitiesByLocationName(
  name: string
): Promise<AxiosResponse<LocationData[]>> {
  return axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`
  );
}

export function getWeatherForLocation(
  { lon, lat }: { lon: number; lat: number },
  lang = "ru"
): Promise<AxiosResponse<CityWeatherData>> {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}&exclude=minutely,hourly,alerts`
    );
}

export function getWeatherIconUrlByName(iconName: string, size = 4) {
  return `https://openweathermap.org/img/wn/${iconName}@${size}x.png`;
}
