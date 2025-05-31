import {
  createSelector,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';
import { RootState } from '../../store';

type TStateBurgerConstructor = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

export const initialState: TStateBurgerConstructor = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { id: key, ...ingredient } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
        console.log('Slice_add');
      }
    },

    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
      console.log('Slice_remove');
    },

    moveupIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const selectedIngredientIndex =
        state.constructorItems.ingredients.findIndex(
          (item) => item.id === action.payload.id
        );
      const [selectedIngredient] = state.constructorItems.ingredients.splice(
        selectedIngredientIndex,
        1
      );
      state.constructorItems.ingredients.splice(
        selectedIngredientIndex - 1,
        0,
        selectedIngredient
      );
      console.log('Slice_moveup');
    },

    movedownIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const selectedIngredientIndex =
        state.constructorItems.ingredients.findIndex(
          (item) => item.id === action.payload.id
        );
      const [selectedIngredient] = state.constructorItems.ingredients.splice(
        selectedIngredientIndex,
        1
      );
      state.constructorItems.ingredients.splice(
        selectedIngredientIndex + 1,
        0,
        selectedIngredient
      );
      console.log('Slice_movedown');
    },

    resetConstructor: (state) => initialState
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getConstructorItemsBun: (state) => state.constructorItems.bun,
    getConstructorItemsIngredients: (state) =>
      state.constructorItems.ingredients
  }
});

export default burgerConstructorSlice;

export const { getConstructorItems } = burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  moveupIngredient,
  movedownIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
