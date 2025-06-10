import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';

export type TStateIngredients = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TStateIngredients = {
  ingredients: [],
  loading: true,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAllIngredients',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
  selectors: {
    getIngredientsData: (state) => state.ingredients,
    getIsLoading: (state) => state.loading
  }
});

export default ingredientsSlice;

export const { getIngredientsData, getIsLoading } = ingredientsSlice.selectors;
export const ingredientsSliceReducer = ingredientsSlice.reducer;
