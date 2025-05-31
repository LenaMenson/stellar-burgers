import {
  combineReducers,
  combineSlices,
  configureStore
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

//импорты редюсеров
import { burgerConstructorSliceReducer } from './slices/burgerConstructor/burgerConstructorSlice';
import { feedsSliceReducer } from './slices/feeds/feedsSlice';
import { ingredientsSliceReducer } from './slices/ingredients/ingredientsSlice';
import { userInfoSliceReducer } from './slices/userInfo/userInfoSlice';
import { userOrderSliceReducer } from './slices/userOrder/userOrderSlice';

// Заменить на импорт настоящего редьюсера
const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  constructorItems: burgerConstructorSliceReducer,
  feeds: feedsSliceReducer,
  auth: userInfoSliceReducer,
  orders: userOrderSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
