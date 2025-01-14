import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './features/articlesSlice';

import { Article } from './features/articlesSlice';

export interface RootState {
  articles: {
    articles: Article[];
    loading: boolean;
    totalArticles: number;
    currentPage: number;
    articlesPerPage: number;
    error: string | null;
  };
}

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
