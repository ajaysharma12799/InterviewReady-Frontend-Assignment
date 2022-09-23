/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './slices/articleSlice';

export const store = configureStore({
  reducer: {
    articles: articleSlice,
  },
});
