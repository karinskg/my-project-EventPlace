import { configureStore } from '@reduxjs/toolkit'

import calendar from './feature/calendarSlice'
import weather from './feature/weatherSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    calendar,
    weather
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();