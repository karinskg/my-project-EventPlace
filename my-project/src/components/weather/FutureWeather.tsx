import { Fragment } from 'react';
import type { IFutureWeather, WeatherHours } from '../../types';
import { formateDate } from '../../utils';

interface futureW {
  weather: IFutureWeather;
  weatherHour: WeatherHours[] | undefined;
}

const FutureWeather = ({ weather, weatherHour }: futureW) => {
  return (
    <section className="weather-widget">
      <div className="weather-widget__main">
        <div className="weather-widget__info">
          <h2 className="weather-widget__city">{weather.location.name}</h2>
          <p className="weather-widget__date">{formateDate(weather.forecast?.forecastday?.[0]?.date)}</p>
          <div className="weather-widget__condition">
            <img
              src={weather.forecast?.forecastday[0]?.day?.condition?.icon}
              alt={weather.forecast?.forecastday[0]?.day?.condition?.text}
              className="weather-widget__icon"
            />
            <span className="weather-widget__status">{weather.forecast?.forecastday[0]?.day?.condition?.text}</span>
          </div>
        </div>

        <div className="weather-widget__temp-block">
          <span className="weather-widget__current-temp">
            {Math.round(weather?.forecast?.forecastday?.[0].day?.avgtemp_c)}°
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
          weatherHour !== undefined &&
          weatherHour.map((el) => (
            <Fragment key={el.time_epoch}>
              <div className="forecast-item ">
                <span className="forecast-item__time">
                  {el.time.split(' ')[1]}
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

export default FutureWeather;
