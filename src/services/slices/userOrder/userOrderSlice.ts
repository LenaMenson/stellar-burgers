import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';

export type TStateUserOrders = {
  orders: TOrder[];
  userOrder: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
};

export const initialState: TStateUserOrders = {
  orders: [],
  userOrder: null,
  orderRequest: false,
  loading: false
};

export const getUserOrders = createAsyncThunk('user/getUserOrders', async () =>
  getOrdersApi()
);

export const newUserOrder = createAsyncThunk(
  'user/newUserOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    setUserOrder: (state, action) => {
      state.userOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(newUserOrder.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(newUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order);
        state.userOrder = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(newUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getOrderRequest: (state) => state.orderRequest,
    getUserOrder: (state) => state.userOrder
  }
});

export default userOrderSlice;

export const { setUserOrder } = userOrderSlice.actions;
export const userOrderSliceReducer = userOrderSlice.reducer;
export const { getOrders, getOrderRequest, getUserOrder } =
  userOrderSlice.selectors;
