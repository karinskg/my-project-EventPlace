import { configureStore } from '@reduxjs/toolkit';

import calendar from './feature/calendarSlice';
import weather from './feature/weatherSlice';
import eventsApi, { cartDetailApi } from './feature/comEventApiSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    calendar,
    weather,
    eventsApi,
    [cartDetailApi.reducerPath]: cartDetailApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartDetailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
