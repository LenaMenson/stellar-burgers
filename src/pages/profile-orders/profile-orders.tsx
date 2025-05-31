import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';

import { getUserOrders } from '../../services/slices/userOrder/userOrderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.orders.loading);
  const orders: TOrder[] = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  if (isLoad) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
