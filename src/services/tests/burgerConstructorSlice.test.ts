import {
  addIngredient,
  burgerConstructorSliceReducer,
  movedownIngredient,
  initialState,
  removeIngredient,
  moveupIngredient
} from '../slices/burgerConstructor/burgerConstructorSlice';

describe('Тестирование экшенов слайса конструктора бургера', () => {
  const mockBun = {
    id: 'Булка',
    _id: 'Булка',
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
  };

  const mockIngredient1 = {
    id: '1',
    _id: '1',
    name: 'Ингредиент_1',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const mockIngredient2 = {
    id: '2',
    _id: '2',
    name: 'Ингредиент_2',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  describe('Тестирование добавления и удаления продуктов (булка и ингредиент)', () => {
    it('Тест добавления булки в конструктор', () => {
      const state = burgerConstructorSliceReducer(
        initialState,
        addIngredient(mockBun)
      );
      const bun = state.constructorItems.bun;
      expect(bun).toEqual(mockBun);
    });

    it('Тест добавления ингредиента в конструктор', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      const ingredients = newState.constructorItems.ingredients;

      expect(ingredients).toEqual([mockIngredient1]);
    });
  });

  describe('Удаление продукта', () => {
    it('Тест удаления булки из конструктора', () => {
      const state = burgerConstructorSliceReducer(
        initialState,
        addIngredient(mockBun)
      );
      const currentState = burgerConstructorSliceReducer(
        state,
        removeIngredient(mockBun)
      );
      const constructorItemsBun = currentState.constructorItems.bun;
      expect(constructorItemsBun).toEqual(state.constructorItems.bun);
    });

    it('Тест удаления ингредиента из конструктора', () => {
      const state = burgerConstructorSliceReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      const currentState = burgerConstructorSliceReducer(
        state,
        removeIngredient(mockIngredient1)
      );
      expect(currentState).toEqual(initialState);
    });
  });

  describe('Тестирование перемещения продукта', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient1, mockIngredient2]
      }
    };

    it('Тест перемещения ингредиента вверх', () => {
      const expectedResult = [mockIngredient2, mockIngredient1];
      const state = burgerConstructorSliceReducer(
        initialState,
        moveupIngredient(mockIngredient2)
      );
      const constructorItemsIngredients = state.constructorItems.ingredients;
      expect(constructorItemsIngredients).toEqual(expectedResult);
    });

    it('Тест перемещения ингредиента вниз', () => {
      const expectedResult = [mockIngredient2, mockIngredient1];
      const state = burgerConstructorSliceReducer(
        initialState,
        movedownIngredient(mockIngredient1)
      );
      const constructorIngredients = state.constructorItems.ingredients;
      expect(constructorIngredients).toEqual(expectedResult);
    });
  });
});
