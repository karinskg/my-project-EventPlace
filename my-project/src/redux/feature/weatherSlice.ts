import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { IFutureWeather, IWeather, WeatherHours } from '../../types';
import dayjs from 'dayjs';

interface Idates {
  city: string;
  date: string;
  types: 'today' | 'future';
}

export const FetchWeather = createAsyncThunk(
  'weather/fetch',
  async ({ city, date, types }: Idates, thunkAPI) => {
    const url =
      types === 'today'
        ? `https://api.weatherapi.com/v1/forecast.json?key=83ba5181d2434bd6861103130261003&q=${city}&days=1&aqi=no&alerts=no`
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
  weather: IWeather | IFutureWeather | null;
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
      .addCase(FetchWeather.fulfilled, (state, actions) => {
        state.viewType = 'current' in actions.payload ? 'current' : 'future';
        state.weather = actions.payload;

        state.weatherHour = state.weather?.forecast.forecastday[0].hour;

        console.log(state.weather);

        const currentDateApi = dayjs(
          state.weather?.forecast.forecastday[0].date.split(' ')[0],
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
