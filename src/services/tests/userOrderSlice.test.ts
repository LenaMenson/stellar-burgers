import {
  getUserOrders,
  newUserOrder,
  initialState,
  setUserOrder,
  userOrderSliceReducer
} from '../slices/userOrder/userOrderSlice';

describe('Тестирование экшенов слайса userOrder', () => {

  describe('Тестирование получения заказов пользователя', () => {

    const expectedResultUserOrders = [
      {
        _id: 'orderId_1',
        ingredients: ['bun', 'ingredient1', 'ingredient2', 'sauce'],
        status: 'done',
        name: 'Бургер_1',
        createdAt: "2025-06-08T13:33:17.985Z",
        updatedAt: "2025-06-08T13:33:17.985Z",
        number: 3000
      },
      {
        _id: 'orderId_2',
        ingredients: ['bun', 'ingredient1', 'sauce'],
        status: 'done',
        name: 'Бургер_2',
        createdAt: "2025-06-08T13:34:17.985Z",
        updatedAt: "2025-06-08T13:34:17.985Z",
        number: 2000
      }
    ];
    it('Тест fulfilled', () => {
      const state = userOrderSliceReducer(
        initialState,
        getUserOrders.fulfilled(expectedResultUserOrders, 'fulfilled')
      );
      const status = state.loading;
      const orders = state.orders;
      expect(status).toBeFalsy();
      expect(orders).toEqual(expectedResultUserOrders);
    });

    it('Тест pending', () => {
      const state = userOrderSliceReducer(
        initialState,
        getUserOrders.pending('fulfilled')
      );
      const status = state.loading;
      expect(status).toBeTruthy();
    });

    it('Тест rejected', () => {
      const state = userOrderSliceReducer(
        initialState,
        getUserOrders.rejected(new Error('text error'), 'rejected')
      );
      const status = state.loading;
      expect(status).toBeFalsy();
    });
  });

  describe('Тестирование создания нового заказа пользователя', () => {
    const expectedResultOrder = {
      success: true,
      name: 'Бургер новый',
      order: {
        ingredients: ['bun', 'ingredient', 'sauce'],
        _id: 'orderId',
        owner: {
          name: 'User',
          email: 'User@mail.ru',
          createdAt: "2025-06-08T13:34:17.985Z",
          updatedAt: "2025-06-08T13:34:17.985Z",
        },
        status: 'done',
        name: 'Бургер новый',
        createdAt: "2025-06-08T13:34:17.985Z",
        updatedAt: "2025-06-08T13:34:17.985Z",
        number: 80708,
        price: 3000
      }
    };

    it('Тест fulfilled', () => {
      const state = userOrderSliceReducer(
        initialState,
        newUserOrder.fulfilled(expectedResultOrder, 'fulfilled', [
          'bun',
          'ingredient',
          'sauce'
        ])
      );
      const orderRequest = state.orderRequest;
      const status = state.loading;
      const orders = state.orders;
      const userOrder = state.userOrder;
      expect(orderRequest).toBeFalsy();
      expect(status).toBeFalsy();
      expect(orders[0]).toEqual(expectedResultOrder.order);
      expect(userOrder).toEqual(expectedResultOrder.order);
    });

    it('Тест pending', () => {
      const state = userOrderSliceReducer(
        initialState,
        newUserOrder.pending('fulfilled', [
          'bun',
          'ingredient',
          'sauce'
        ])
      );
      const orderRequest = state.orderRequest;
      const status = state.loading; 
      expect(orderRequest).toBeTruthy();
      expect(status).toBeTruthy();
    });

    it('Тест rejected', () => {
      const state = userOrderSliceReducer(
        initialState,
        newUserOrder.rejected(new Error('text error'), 'rejected', [
          'bun',
          'ingredient',
          'sauce'
        ])
      );
      const orderRequest = state.orderRequest;
      const status = state.loading; 
      expect(orderRequest).toBeFalsy();
      expect(status).toBeFalsy();
    });
  });

  it('Тестирование изменения данных последнего заказа', () => {
    const state = userOrderSliceReducer(initialState, setUserOrder(null));
    const userOrder = state.userOrder;
    expect(userOrder).toBe(null);
  });
});
