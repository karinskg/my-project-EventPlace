import { Fragment, useEffect, useState, useMemo } from 'react';
import { formateDate } from '../utils';
import dayjs from 'dayjs';
import type { WeatherHours } from '../types';

import { FetchWeather } from '../redux/feature/weatherSlice';
import { useAppDispatch, type RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Weather = () => {
  
  const today = dayjs();

  const [weatherHour, setWeatherHour] = useState<WeatherHours[] | null>([]);

  const weather = useSelector((state:RootState)=> state.weather.weather)
  

  const dispatch = useAppDispatch()

  const [currentDateApi] = useState(() =>{
    if(weather === null){return}
    return dayjs(weather.location.localtime.split(' ')[0]).isSame(today, 'day')}
  );

  useEffect(() => {
    dispatch(FetchWeather())

    if (!weather?.forecast?.forecastday?.[0]?.hour) return;

    // const hours = weather.forecast.forecastday[0].hour;

    // setWeatherHour(hours);

    // if (currentDateApi) {
    //   const NumberToday = Number(today.format('H'));
    //   const arr = hours.filter((hour) => {
    //     return parseInt(hour.time.split(' ')[1].split(':')[0], 10) >= NumberToday;
    //   });
    //   setWeatherHour(arr);
    // }
  }, []);

  console.log(weatherHour)

  if(weather === null){return <p>техническая ошибка</p> }

  return (
    <section className="weather-widget">
      <div className="weather-widget__main">
        <div className="weather-widget__info">
          <h2 className="weather-widget__city">{weather.location.name}</h2>
          <p className="weather-widget__date">{formateDate(weather.location.localtime)}</p>
          <div className="weather-widget__condition">
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="weather-widget__icon"
            />
            <span className="weather-widget__status">{weather.current.condition.text}</span>
          </div>
        </div>

        <div className="weather-widget__temp-block">
          <span className="weather-widget__current-temp">
            {Math.round(weather.current.temp_c)}°
          </span>
          <div className="weather-widget__range">
            <span className="high">
              {Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}°
            </span>{' '}
            /{' '}
            <span className="low">
              {Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°
            </span>
          </div>
        </div>
      </div>

      <nav className="weather-widget__nav">
        <a href="#" className="active">
          Hourly
        </a>
      </nav>

      <div className="weather-widget__hourly">
        {weather.forecast.forecastday.length !== 0 &&
          weatherHour !== null &&
          weatherHour.map((el) => (
            <Fragment key={el.time_epoch}>
              <div className="forecast-item ">
                <span className="forecast-item__time">
                  {weatherHour[0] === el ? 'NOW' : el.time.split(' ')[1]}
                </span>
                <img
                  src={el.condition.icon}
                  alt={el.condition.text}
                  className="forecast-item__icon"
                />
                <p className="forecast-item__temp">{`${Math.round(el.temp_c)}°`}</p>
              </div>
            </Fragment>
          ))}
      </div>
    </section>
  );
};

export default Weather;
