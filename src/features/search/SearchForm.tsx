import React from 'react';
import LocationSearchField from './LocationSearchField';
import CityWeatherCard from './CityWeatherCard';
import Stack from '@mui/material/Stack';
import { useStore } from 'effector-react';
import {
  $currentCityWeather,
  $selectedCity,
} from '@/features/search/store';
import { useTranslation } from "react-i18next";

function SearchForm() {
  const { i18n } = useTranslation();
  const cityWeather = useStore($currentCityWeather);
  const currentCity = useStore($selectedCity);

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="stretch"
      sx={{ width: 480, maxWidth: '100%' }}
    >
      <LocationSearchField />

      {
        !!currentCity &&
        <CityWeatherCard
          weather={cityWeather}
          cityName={currentCity?.local_names?.[i18n.language] || currentCity?.name}
        />
      }
    </Stack>
  );
}

export default SearchForm;
