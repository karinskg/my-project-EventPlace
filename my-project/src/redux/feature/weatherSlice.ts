import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import type { IWeather, WeatherHours } from '../../typescript/weatherTS';

interface Idates {
  city: string;
  date: string;
  types: 'today' | 'future';
  willDay: number;
}

export const FetchWeather = createAsyncThunk(
  'weather/fetch',
  async ({ city, date, types, willDay }: Idates, thunkAPI) => {
    const url =
      types === 'today'
        ? `https://api.weatherapi.com/v1/forecast.json?key=83ba5181d2434bd6861103130261003&q=${city}&days=${willDay}&aqi=no&alerts=no`
        : `http://api.weatherapi.com/v1/future.json?key=83ba5181d2434bd6861103130261003&q=${city}&dt=${date}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.error.message || 'Ошибка сервера');
      }
      const arr = await response.json();
      return arr;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export interface WeatherState {
  weatherHour: WeatherHours[] | undefined;
  weather: IWeather | null;
  isLoading: boolean;
  viewType: 'current' | 'future' | 'loading' | 'error';
}

const initialState: WeatherState = {
  weatherHour: [],
  weather: null,
  isLoading: false,
  viewType: 'loading',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchWeather.fulfilled, (state, { payload }) => {
        state.viewType = 'current' in payload ? 'current' : 'future';
        const length = payload.forecast.forecastday.length - 1;
        const transform = {
          name: payload.location.name,
          icon:
            payload.current?.condition?.icon ||
            payload.forecast?.forecastday[length]?.day?.condition?.icon,
          text:
            payload.current?.condition?.text ||
            payload.forecast?.forecastday[length]?.day?.condition?.text,
          temp_c: payload.current?.temp_c,
          avgtemp_c: payload.forecast?.forecastday[length].day.avgtemp_c,
          maxtemp_c: payload.forecast?.forecastday[length].day.maxtemp_c,
          mintemp_c: payload.forecast?.forecastday[length].day.mintemp_c,
          forecastday: payload.forecast?.forecastday,
          date: payload.forecast?.forecastday?.[length]?.date,
        };
        console.log(transform);

        state.weather = transform;

        const lengthArr = state.weather?.forecastday.length || 0;

        state.weatherHour = state.weather?.forecastday[lengthArr - 1].hour;

        const currentDateApi = dayjs(
          state.weather?.forecastday[lengthArr - 1].date.split(' ')[0],
        ).isSame(dayjs(), 'day');

        if (currentDateApi) {
          const NumberToday = Number(dayjs().format('H'));
          const arr = state.weatherHour?.filter((hour) => {
            return parseInt(hour.time.split(' ')[1].split(':')[0], 10) >= NumberToday;
          });
          state.weatherHour = arr;
        }
        state.isLoading = false;
      })
      .addCase(FetchWeather.rejected, (state) => {
        state.viewType = 'error';
        state.isLoading = false;
      });
  },
});

export default weatherSlice.reducer;
