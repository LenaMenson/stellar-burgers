import {
  getAuthUser,
  initialState,
  loginUser,
  loginSuccess,
  registerUser,
  updateInfoUser,
  logoutUser,
  userInfoSliceReducer
} from '../slices/userInfo/userInfoSlice';

describe('Тестирование экшенов слайса userInfo', () => {
  
  const expectedResult = {
    success: true,
    accessToken: '',
    refreshToken: '',
    user: {
      email: 'user@mail.ru',
      name: 'user'
    },
    loading: true
  };

  describe('Тестирование getAuthUser', () => {
   
    it('Тест fulfilled', () => {
      const state = userInfoSliceReducer(
        initialState,
        getAuthUser.fulfilled(expectedResult, 'fulfilled')
      );
      const status = state.loading; 
      const user = state.user;
      const success = state.success;
      expect(status).toBeFalsy();
      expect(user).toEqual(expectedResult.user);
      expect(success).toBeTruthy();
    });

    it('Тест pending', () => {
      const state = userInfoSliceReducer(
        initialState,
        getAuthUser.pending('pending')
      );
      const status = state.loading; 
      const success = state.success;
      expect(status).toBeTruthy();  
      expect(success).toBeFalsy();
    });

    it('Тест rejected', () => {
      const state = userInfoSliceReducer(
        initialState,
        getAuthUser.rejected(new Error('error'), 'rejected')
      );
      const status = state.loading; 
      const user = state.user;
      const success = state.success;
      expect(status).toBeFalsy();
      expect(user).toEqual(initialState.user);
      expect(success).toBeFalsy();
    });
  });

  describe('Тестирование loginUser', () => {
    
    it('Тест fulfilled', () => {
      const state = userInfoSliceReducer(
        initialState,
        loginUser.fulfilled(expectedResult, 'fulfilled', {
          email: expectedResult.user.email,
          password: '123'
        })
      );
      const status = state.loading; 
      const user = state.user;
      const success = state.success;
      expect(status).toBeFalsy();
      expect(user).toEqual(expectedResult.user);
      expect(success).toBeTruthy();
    });

    it('Тест pending', () => {
      const state = userInfoSliceReducer(
        initialState,
        loginUser.pending('pending', {
          email: expectedResult.user.email,
          password: '123'
        })
      );
      const status = state.loading;   
      expect(status).toBeTruthy();
    });

    it('Тест rejected', () => {
      const state = userInfoSliceReducer(
        initialState,
        loginUser.rejected(new Error('error'), 'rejected', {
          email: expectedResult.user.email,
          password: '123'
        })
      );
      const status = state.loading; 
      const user = state.user;
      const success = state.success;
      expect(status).toBeFalsy();
      expect(user).toEqual(initialState.user);
      expect(success).toBeFalsy();
    });
  });

  describe('Тестирование registerUser', () => {
    it('Тест fulfilled', () => {
      const state = userInfoSliceReducer(
        initialState,
        registerUser.fulfilled(expectedResult, 'fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      const status = state.loading; 
      const user = state.user;
      const success = state.success;
      expect(status).toBeFalsy();
      expect(user).toEqual(expectedResult.user);
      expect(success).toBeTruthy();
    });

    it('Тест pending', () => {
      const state = userInfoSliceReducer(
        initialState,
        registerUser.pending('fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      const status = state.loading; 
      const success = state.success;
      expect(status).toBeTruthy();
      expect(success).toBeFalsy();
    });

    it('запрос rejected', () => {
      const state = userInfoSliceReducer(
        initialState,
        registerUser.rejected(new Error('error'), 'rejected', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      const status = state.loading; 
      const success = state.success;
      expect(status).toBeFalsy();
      expect(success).toBeFalsy();
    });
  });

  describe('Тестирование updateInfoUser', () => {
    it('Тест fulfilled', () => {
      const state = userInfoSliceReducer(
        initialState,
        updateInfoUser.fulfilled(expectedResult, 'fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      const status = state.loading; 
      const user = state.user;
      const success = state.success;
      expect(status).toBeFalsy();
      expect(user).toEqual(expectedResult.user);
      expect(success).toBeTruthy();
    });

    it('Тест pending', () => {
      const state = userInfoSliceReducer(
        initialState,
        updateInfoUser.pending('fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      const status = state.loading; 
      const success = state.success;
      expect(status).toBeTruthy();
      expect(success).toBeFalsy();
    });

    it('запрос rejected', () => {
      const state = userInfoSliceReducer(
        initialState,
        updateInfoUser.rejected(new Error('error'), 'rejected', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      const status = state.loading; 
      const success = state.success;
      expect(status).toBeFalsy();
      expect(success).toBeFalsy();
    });
  });

  describe('Тестирование logoutUser', () => {
    it('Тест fulfilled', () => {
      const state = userInfoSliceReducer(
        initialState,
        logoutUser.fulfilled(undefined, '')
      );
      const status = state.loading; 
      const user = state.user;
      const success = state.success;
      expect(status).toBeFalsy();
      expect(user).toEqual(initialState.user);
      expect(success).toBeFalsy();
    });

    it('Тест pending', () => {
      const state = userInfoSliceReducer(
        initialState,
        logoutUser.pending('fulfilled')
      );
      const status = state.loading; 
      const success = state.success;
      expect(status).toBeTruthy();
      expect(success).toBeFalsy();
    });

    it('Тест rejected', () => {
      const state = userInfoSliceReducer(
        initialState,
        logoutUser.rejected(new Error('error'), 'rejected')
      );
      const status = state.loading; 
      const success = state.success;
      expect(status).toBeFalsy();
      expect(success).toBeFalsy();
    });
  });

  it('Тестирование изменения состаяния авторизации', () => {
    const state = userInfoSliceReducer(initialState, loginSuccess(true));
    const success = state.success;
    expect(success).toBeTruthy();
  });
});
