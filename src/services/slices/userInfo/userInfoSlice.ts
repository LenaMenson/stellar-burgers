import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  registerUserApi,
  updateUserApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '../../../utils/burger-api';

import {
  deleteCookie,
  getCookie,
  setCookie
} from '../../../../src/utils/cookie';

export type TStateUser = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  loading: boolean;
};

export const initialState: TStateUser = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  loading: false
};

export const getAuthUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const dataLogin = await loginUserApi({ email, password });
    setCookie('accessToken', dataLogin.accessToken);
    localStorage.setItem('refreshToken', dataLogin.refreshToken);
    return dataLogin;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (regData: TRegisterData) => await registerUserApi(regData)
);

export const updateInfoUser = createAsyncThunk(
  'user/updateUserData',
  async (regData: Partial<TRegisterData>) => await updateUserApi(regData)
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUser.pending, (state) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(updateInfoUser.pending, (state) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(updateInfoUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(updateInfoUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.success = false;
        state.user = initialState.user;
        state.loading = false;
      });
  },
  selectors: {
    getAuthUserStatus: (state) => state.success,
    getAuthUserLoading: (state) => state.loading,
    getUser: (state) => state.user
  }
});

export default userInfoSlice;

export const { loginSuccess } = userInfoSlice.actions;
export const userInfoSliceReducer = userInfoSlice.reducer;
export const { getAuthUserStatus, getAuthUserLoading, getUser } =
  userInfoSlice.selectors;
