import { TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  TOrderResponse
} from '../../../utils/burger-api';
import { RootState } from '../../store';

export type TStateFeeds = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  orderByNumber: TOrderResponse | null;
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TStateFeeds = {
  orders: [],
  total: 0,
  totalToday: 0,
  orderByNumber: null,
  loading: true,
  error: null
};

export const getAllFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderById',
  async (number: number) => getOrderByNumberApi(number).then((data) => data)
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
  selectors: {
    getOrdersData: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTodayOrders: (state) => state.totalToday,
    getIsLoading: (state) => state.loading,
    getError: (state) => state.error,
    getOrderByNumberSelector: (state) => state.orderByNumber?.orders[0]
  }
});

export default feedsSlice;

export const feedsSliceReducer = feedsSlice.reducer;

export const {
  getOrdersData,
  getTotalOrders,
  getTodayOrders,
  getIsLoading,
  getError,
  getOrderByNumberSelector
} = feedsSlice.selectors;
