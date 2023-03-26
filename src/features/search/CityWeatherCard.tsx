import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Icon from '@mui/material/Icon';
import type { CityWeatherData } from '@/services/api/types';
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter, formatTemperature, getWindDirection } from "@/utils/formatters";
import { getWeatherIconUrlByName } from '@/services/api';
import * as Styled from './styled';

interface Props {
  weather?: CityWeatherData | null,
  cityName?: string,
  loading?: boolean,
}

interface FormattedData {
  state: string,
  temp: string,
  feelsLikeTemp: string,
  maxMinTemp: string | null,
  pressure: string,
  humidity: string,
  wind: string | null,
  time: string,
}

function CityWeatherCard(props: Props) {
  const { t } = useTranslation();

  // Приведенные к отображаемому формату данные
  const formattedData = React.useMemo((): FormattedData | null => {
    const weather = props.weather;
    if (!weather) {
      return null;
    }

    let date;
    let time: string;
    if (weather.current.dt) {
      date = new Date(weather.current.dt * 1000);
      time = date.toLocaleTimeString('ru', { timeZone: weather.timezone, hour: '2-digit', minute: '2-digit' });
    }
    const safeFormat = (value: any, formatter: (val: unknown) => string, defaultValue = '') => {
      return value == null ? defaultValue : formatter(value);
    }
    return {
      state: capitalizeFirstLetter(weather.current.weather[0]?.description),
      temp: safeFormat(weather.current.temp, () => formatTemperature(weather.current.temp)),
      feelsLikeTemp: safeFormat(weather.current.feels_like, () => t('feelsLike', {temp: formatTemperature(weather.current.feels_like)})),
      maxMinTemp: !!weather.daily[0] && weather.daily[0].temp.min != null
          ? t('maxMinTemp', {
            max: formatTemperature(weather.daily[0].temp.max),
            min: formatTemperature(weather.daily[0].temp.min)
          })
          : null,
      pressure: safeFormat(weather.current.pressure, () => t('pressureValue', {value: weather.current.pressure})),
      humidity: safeFormat(weather.current.humidity, () => `${weather.current.humidity}%`),
      wind: weather.current.wind_speed != null && weather.current.wind_deg != null
          ? t('wind.speedAndDirection', {
            speed: weather.current.wind_speed,
            direction: t(`wind.directions.${getWindDirection(weather.current.wind_deg)}`)
          })
          : null,
      time: safeFormat(date, () => t('timeNow', { time })),
    }
  }, [props.weather, t]);

  // Урл иконки для погоды
  const imageUrl = React.useMemo(() => {
    if (!props.weather?.current?.weather?.[0]?.icon) {
      return null;
    }
    return getWeatherIconUrlByName(props.weather.current.weather[0].icon);
  }, [props.weather]);

  // Список показателей погоды
  const mainProperties = React.useMemo(() => {
    if (!formattedData) {
      return [];
    };

    return [
      {icon: 'air', value: formattedData.wind, title: t('wind.wind')},
      {icon: 'water_percent', value: formattedData.humidity, title: t('humidity')},
      {icon: 'storm', value: formattedData.pressure, title: t('pressure')},
    ];
  }, [formattedData, t]);

  return (
    <Styled.WeatherCard variant="outlined">
      <CardContent>
        {
          (!!props.weather && !!formattedData) &&
          <>
            <Typography variant="h5" gutterBottom>
              {props.cityName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {formattedData.time}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}
            >
              <Typography variant="h2">
                {formattedData.temp}
              </Typography>

              {
                !!imageUrl &&
                <Styled.WeatherIconImg
                  src={imageUrl}
                  alt={formattedData.state}
                />
              }

              <Stack
                direction="column"
              >
                <span>{formattedData.state}</span>
                <span>{formattedData.feelsLikeTemp}</span>
                <span>{formattedData.maxMinTemp}</span>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {
                mainProperties.map((item) => 
                  <Chip
                    icon={<Icon>{item.icon}</Icon>}
                    label={item.value}
                    variant="filled"
                    key={item.icon}
                    color="default"
                  />
                )
              }
            </Stack>
          </>
        }
      </CardContent>
    </Styled.WeatherCard>
  )
}

export default CityWeatherCard;
