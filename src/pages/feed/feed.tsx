import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

import {
  getAllFeeds,
  getIsLoading,
  getOrdersData
} from '../../services/slices/feeds/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.feeds.loading);

  const orders: TOrder[] = useSelector((state) => state.feeds.orders);

  //добавлено loading
  if (!orders.length || loading) {
    return <Preloader />;
  }
  const handleGetAllFeeds = () => {
    console.log('pages/feed_handleGetAllFeeds');
    dispatch(getAllFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllFeeds} />;
};
