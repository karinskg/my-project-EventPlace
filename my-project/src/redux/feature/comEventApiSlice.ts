import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Event } from '../../types';

interface FetchEventsArgs {
  start: string;
  end: string;
  page: number;
}
export const FetchEvents = createAsyncThunk(
  'events/fetch',
  async ({ start, end, page }: FetchEventsArgs, thunkAPI) => {
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${start}&page=${page}&endDateTime=${end}&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w`,
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
  },
);

export interface WeatherState {
  comingEvents: Event[];
  favouriteEv: Record<string, Omit<Event, 'id'>>;
  isLoading: boolean;
  error: string;
  page: number;
  inputValRed: string;

  filtersComingEvent: Event[];
}

const initialState: WeatherState = {
  comingEvents: [],
  filtersComingEvent: [],
  page: 0,
  isLoading: false,
  favouriteEv: {},

  error: '',
  inputValRed: '',
};

export const comEventApiSlice = createSlice({
  name: 'comSoonApi',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const { id, ...data } = action.payload; //диструкторизация
      if (!state.favouriteEv[id]) {
        state.favouriteEv[id] = data; //{'key':{...data}}
      }
    },

    filterSeeAll: (state) => {
      const query = state.inputValRed.trim().toLowerCase();

      if (!query) {
        state.filtersComingEvent = [];
      } else {
        state.filtersComingEvent = state.comingEvents.filter((el) => {
          return el.name?.toLowerCase().includes(query);
        });
      }
    },

    removeFavourite: (state, action) => {
      const id = action.payload;
      if (state.favouriteEv[id]) {
        delete state.favouriteEv[id];
      }
    },
    inputValues: (state, action) => {
      state.inputValRed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;

        const newEvents = action.payload._embedded?.events || [];

        const existingIds = new Set(state.comingEvents.map((event) => event.id));

        newEvents.forEach((newEvent: Event) => {
          if (!existingIds.has(newEvent.id)) {
            state.comingEvents.push(newEvent);
          }
        });

        state.page += 1;
      })
      .addCase(FetchEvents.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = (actions.payload as string) || 'Unknown error';
      });
  },
});
export const { addFavourite, removeFavourite, inputValues, filterSeeAll } =
  comEventApiSlice.actions;
export default comEventApiSlice.reducer;
