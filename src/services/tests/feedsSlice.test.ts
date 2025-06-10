import {
  feedsSliceReducer,
  getAllFeeds,
  getOrderByNumber,
  initialState
} from '../slices/feeds/feedsSlice';

describe('Тестирование экшенов слайса feeds', () => {

  const mockUserOrdersListData = {
    success: true,
    orders: [
      {
        _id: 'testId_1',
        ingredients: [
          'bun',
          'ingredient1',
          'ingredient2',
          'sauce'
        ],
        status: 'done',
        name: 'Тестовый бургер 1',
        createdAt: "2025-06-08T13:34:17.985Z",
        updatedAt: "2025-06-08T13:34:17.985Z",
        number: 80708
      },
      {
        _id: 'testId_2',
        ingredients: [
          'bun',
          'ingredient1',
          'sauce'
        ],
        status: 'done',
        name: 'Тестовый бургер 2',
        createdAt: "2025-06-08T13:35:17.985Z",
        updatedAt: "2025-06-08T13:35:17.985Z",
        number: 80709
      }
    ],
    total: 9168,
    totalToday: 57
  };

  const expectedResult = {
    success: true,
    orders: [
      {
        _id: 'testId_1',
        ingredients: [
          'bun',
          'ingredient1',
          'ingredient2',
          'sauce'
        ],
        status: 'done',
        name: 'Тестовый бургер 1',
        createdAt: "2025-06-08T13:34:17.985Z",
        updatedAt: "2025-06-08T13:34:17.985Z",
        number: 80708
      }
    ]
  };

  describe('Тестирование getAllFeeds', () => {

    it('Тест загрузки списка заказов', async () => {
      const state = feedsSliceReducer(
        initialState,
        getAllFeeds.fulfilled(mockUserOrdersListData, 'fulfilled')
      );
      const status = state.loading; 
      const orders = state.orders; 
      expect(status).toBeFalsy();
      expect(orders).toEqual(mockUserOrdersListData.orders);
    });

    it('Тест сообщения ошибки при загрузке списка заказов', async () => {
      const state = feedsSliceReducer(
        initialState,
        getAllFeeds.rejected(new Error('Не удалось загрузить список заказов'), 'rejected')
      );
      const status = state.loading;
      const error = state.error;
      expect(status).toBeFalsy();
      expect(error).toBe('Не удалось загрузить список заказов');
    });

    it('Тест состояния загрузки списка заказов', async () => {
      const state = feedsSliceReducer(
        initialState,
        getAllFeeds.pending('pending')
      );
      const status = state.loading; 
      expect(status).toBeTruthy();
    });
  });

  describe('Тестирование экшенов слайса feeds', () => {

    it('Тест получения заказа по номеру', () => {
      const state = feedsSliceReducer(
        initialState,
        getOrderByNumber.fulfilled(
          expectedResult,
          'fulfilled',
          +'testId_1'
        )
      );
      const status = state.loading; 
      const error = state.error;
      const orderByNumber = state.orderByNumber;
      expect(status).toBeFalsy();
      expect(orderByNumber).toEqual(expectedResult);
      expect(error).toBe(null);
    });

    it('Тест состояния загрузки получения заказа по номеру', () => {
      const state = feedsSliceReducer(
        initialState,
        getOrderByNumber.pending('pending', +'testId_1')
      );
      const status = state.loading;
      const error = state.error;
      expect(status).toBeTruthy();
      expect(error).toBe(null);
    });

    it('Тест сообщения ошибки получения заказа по номеру', () => {
      const state = feedsSliceReducer(
        initialState,
        getOrderByNumber.rejected(
          new Error('Не удалось получить данные заказа'),
          'rejected',
          +'testId_1'
        )
      );
      const status = state.loading;
      const error = state.error; 
      expect(status).toBeFalsy(); 
      expect(error).toBe('Не удалось получить данные заказа');
    });
  });
});
