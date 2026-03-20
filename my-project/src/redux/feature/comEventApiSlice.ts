import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Event, ICartDetail } from '../../types';

interface FetchEventsArgs {
  start: string;
  end: string;
  page: number;
}

interface FetchAllEvents {
  start: string;
  end: string;
  page: number;
  sort: string;
  keyword: string;
  classificationName: string;
  other: boolean;
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

export const Fetch = createAsyncThunk(
  'Allevents/fetch',
  async (
    {
      start,
      end,
      page = 1,
      sort,
      keyword,
      classificationName,
      other = false,
    }: Partial<FetchAllEvents>,
    thunkAPI,
  ) => {
    const queryParams: Record<string, any> = {
      apikey: 'BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w',
      page,
      ...(start && { startDateTime: `${start}T00:00:00Z` }),
      ...(end && { endDateTime: `${end}T00:00:00Z` }),
      ...(keyword && { keyword }),
      ...(classificationName && { classificationName }),
      ...(sort && { sort }),
    };

    const searchParams = new URLSearchParams(queryParams).toString();

    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?${searchParams}`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.error.message || 'Ошибка сервера');
      }
      const arr = await response.json();
      if (other) {
        arr['other'] = true;
      }

      return arr;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const cartDetailApi = createApi({
  reducerPath: 'cartDetailApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://app.ticketmaster.com/discovery/v2/' }),
  endpoints: (builder) => ({
    getCartDetailId: builder.query({
      query: (id) => `events/${id}.json?apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w`,
    }),
  }),
});
export interface WeatherState {
  comingEvents: Event[];
  allEvents: Event[];
  favouriteEv: Record<string, Omit<Event, 'id'>>;
  cartDetail: Partial<ICartDetail> | null;

  isLoadingCom: boolean;
  errorCom: string;
  pageCom: number;

  pageAllEv: number;
  isLoadingAllEv: boolean;
  errorAllEv: string;

  inputValRed: string;
  filtersComingEvent: Event[];
}

const initialState: WeatherState = {
  comingEvents: [],
  allEvents: [],
  filtersComingEvent: [],
  cartDetail: {},
  inputValRed: '',

  pageCom: 0,
  isLoadingCom: false,
  favouriteEv: {},
  errorCom: '',

  pageAllEv: 0,
  isLoadingAllEv: false,
  errorAllEv: '',
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
    removeCartDetail: (state) => {
      state.cartDetail = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchEvents.pending, (state) => {
        state.isLoadingCom = true;
      })
      .addCase(FetchEvents.fulfilled, (state, action) => {
        state.isLoadingCom = false;

        const newEvents = action.payload._embedded?.events || [];

        const existingIds = new Set(state.comingEvents.map((event) => event.id));

        newEvents.forEach((newEvent: Event) => {
          if (!existingIds.has(newEvent.id)) {
            state.comingEvents.push(newEvent);
          }
        });

        state.pageCom += 1;
      })
      .addCase(FetchEvents.rejected, (state, actions) => {
        state.isLoadingCom = false;
        state.errorCom = (actions.payload as string) || 'Unknown error';
      })
      .addCase(Fetch.pending, (state) => {
        state.isLoadingAllEv = true;
      })
      .addCase(Fetch.fulfilled, (state, action) => {
        state.isLoadingAllEv = false;
        const { other } = action.payload;

        if (other) {
          const newEvents = action.payload._embedded?.events || [];

          const existingIds = new Set(state.allEvents.map((event) => event.id));

          newEvents.forEach((newEvent: Event) => {
            if (!existingIds.has(newEvent.id)) {
              state.allEvents.push(newEvent);
            }
          });
        } else {
          state.allEvents = action.payload._embedded?.events || [];
        }

        state.pageAllEv += 1;
      })
      .addCase(Fetch.rejected, (state, actions) => {
        state.isLoadingAllEv = false;
        state.errorAllEv = (actions.payload as string) || 'Unknown error';
        console.log('error');
      })
      .addMatcher(cartDetailApi.endpoints.getCartDetailId.matchFulfilled, (state, { payload }) => {
        state.cartDetail = payload;
      });
  },
});

export const { addFavourite, removeFavourite, inputValues, filterSeeAll, removeCartDetail } =
  comEventApiSlice.actions;
export const { useGetCartDetailIdQuery, useLazyGetCartDetailIdQuery } = cartDetailApi;

export default comEventApiSlice.reducer;
