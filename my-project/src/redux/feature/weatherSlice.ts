import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { IWeather, WeatherHours } from '../../types';
import dayjs from 'dayjs';

export const FetchWeather = createAsyncThunk('weather/fetch', async (city:string, thunkAPI) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=83ba5181d2434bd6861103130261003&q=${city}&days=1&aqi=no&alerts=no`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(errorData.error.message || 'Ошибка сервера');
    }
    const arr = await response.json();
    return arr;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export interface WeatherState {
  weatherHour: WeatherHours[] | undefined;
  weather: IWeather | null;
  isLoading: boolean;
  error: string;
  
}

const initialState: WeatherState = {
  weatherHour: [],
  weather: null,
  isLoading: false,
  error: '',
};

// interface SingleEvent {
//   payload: { id: number; date: string; title: string; time: string; other: string };
// }

// interface payl {
//   payload: { id: number; newTitle: string };
// }

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
        state.weather = actions.payload;
        state.weatherHour = state.weather?.forecast.forecastday[0].hour;

        const currentDateApi = dayjs(state.weather?.location.localtime.split(' ')[0]).isSame(
          dayjs(),
          'day',
        );

        if (currentDateApi) {
          const NumberToday = Number(dayjs().format('H'));
          const arr = state.weatherHour?.filter((hour) => {
            return parseInt(hour.time.split(' ')[1].split(':')[0], 10) >= NumberToday;
          });
          state.weatherHour = arr;
        }
        state.isLoading = false
      })
      .addCase(FetchWeather.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = (actions.payload as string) || 'Unknown error';
      });
  },
});


export default weatherSlice.reducer;
