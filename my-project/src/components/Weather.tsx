import { type RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import CurrentWeather from './weather/CurrentWeather';
import FutureWeather from './weather/FutureWeather';
import type { IFutureWeather, IWeather } from '../types';

const Weather = () => {
  const { weather, weatherHour, isLoading, viewType } = useSelector(
    (state: RootState) => state.weather,
  );

  if (isLoading) return <p>Загрузка...</p>;

  if (viewType === 'error' && !weather) return <p>Нет данных</p>;

  if (viewType === 'current')
    return <CurrentWeather weather={weather as IWeather} weatherHour={weatherHour} />;
  if (viewType === 'future')
    return <FutureWeather weather={weather as IFutureWeather} weatherHour={weatherHour} />;
};

export default Weather;
