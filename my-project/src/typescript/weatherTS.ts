export interface WeatherHours {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  [key: string]: number | string | any;
}

export interface IWeather {
  name: string;
  icon: string;
  text: string;
  temp_c: number;
  avgtemp_c: number;
  maxtemp_c: number;
  mintemp_c: number;
  forecastday: Forecastday[];
  date:string
}

interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
  astro?: Astro;
  hour: Hour[];
}
