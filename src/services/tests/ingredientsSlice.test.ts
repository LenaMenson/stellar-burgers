import { 
  ingredientsSlice,
  getIngredients,
  ingredientsSliceReducer,
  initialState 
} from '../slices/ingredients/ingredientsSlice';

describe('Тестирование экшенов слайса ingredients', () => {

const mockIngredients = [
   {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '2',
    name: 'Ингредиент',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];

it('Тест загрузки ингредиентов', async () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.fulfilled(mockIngredients, 'fulfilled')
    );
    const ingredients = state.ingredients;
    const status = state.loading; 
    expect(status).toBeFalsy();
    expect(ingredients).toEqual(mockIngredients);
  });

it('Тест статуса состояния загрузки', async () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.pending('pending')
    );
    const status = state.loading; 
    expect(status).toBeTruthy();
  });

it('Тест сообщения об ошибке', async () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.rejected(new Error('Не удалось загрузить данные'), 'rejected')
    );
    const error = state.error;
    const status = state.loading; 
    expect(status).toBeFalsy();
    expect(error).toBe('Не удалось загрузить данные');
  });
});
