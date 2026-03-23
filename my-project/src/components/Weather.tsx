import { type RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { formateDate } from '../utils';

const Weather = () => {
  const { weather, weatherHour, isLoading, viewType } = useSelector(
    (state: RootState) => state.weather,
  );

  if (isLoading)
    return (
      <section className="weather-widget" style={{ height: '33.5rem' }}>
        <p>Загрузка...</p>
      </section>
    );

  if (viewType === 'error' && !weather)
    return (
      <section className="weather-widget" style={{ height: '33.5rem' }}>
        <p>Нет данных</p>
      </section>
    );

    if(!weather)return <p>Нет данных</p>

  return (
    <section className="weather-widget">
      <div className="weather-widget__main">
        <div className="weather-widget__info">
          <h2 className="weather-widget__city">{weather?.name}</h2>
          <p className="weather-widget__date">{formateDate(weatherHour?.[0]?.time)}</p>
          <div className="weather-widget__condition">
            <img src={weather?.icon} alt={weather?.text} className="weather-widget__icon" />
            <span className="weather-widget__status">{weather?.text}</span>
          </div>
        </div>

        <div className="weather-widget__temp-block">
          <span className="weather-widget__current-temp">{Math.round(weather?.avgtemp_c)}°</span>
          <div className="weather-widget__range">
            <span className="high">{Math.round(weather?.maxtemp_c)}°</span> /{' '}
            <span className="low">{Math.round(weather?.mintemp_c)}°</span>
          </div>
        </div>
      </div>

      <nav className="weather-widget__nav">
        <a href="#" className="active">
          Hourly
        </a>
      </nav>

      <div className="weather-widget__hourly">
        {weather?.forecastday.length !== 0 &&
          weatherHour !== undefined &&
          weatherHour.map((el) => (
            <Fragment key={el.time_epoch}>
              <div className="forecast-item ">
                <span className="forecast-item__time">{el.time.split(' ')[1]}</span>
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
