export type LocaleKey = "en" | "ru";

export interface LocationData {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface LocationDataWithId extends LocationData {
  id: string;
}

export interface CityWeatherData {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    wind_speed: number,
    wind_deg: number,
    weather: Array<
      {
        description: string,
        icon: string,
        id: number,
        main: string,
      }
    >,
  },
  daily: Array<{
    description: string,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number,
    },
  }>,
}