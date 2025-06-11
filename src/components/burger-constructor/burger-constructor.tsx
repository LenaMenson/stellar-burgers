import React, { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../services/slices/burgerConstructor/burgerConstructorSlice';

import {
  getOrderRequest,
  newUserOrder,
  getUserOrder,
  setUserOrder
} from '../../services/slices/userOrder/userOrderSlice';
import { getAllFeeds } from '../../services/slices/feeds/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const burgerConstructor = useSelector((state) => state.constructorItems);
  const constructorItems = {
    bun: burgerConstructor.constructorItems.bun,
    ingredients: burgerConstructor.constructorItems.ingredients
  };
  const isAuth = useSelector((state) => state.auth.success);
  const orderRequest = useSelector((state) => state.orders.orderRequest);
  const orderModalData = useSelector((state) => state.orders.userOrder);

  const resetOrder = () => {
    dispatch(resetConstructor());
  };

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) {
      return constructorItems.bun;
    }
    const userOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ].filter(Boolean);

    dispatch(newUserOrder(userOrder));
  };
  const closeOrderModal = () => {
    dispatch(setUserOrder(null));
    navigate('/');
    resetOrder();
    dispatch(getAllFeeds());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
