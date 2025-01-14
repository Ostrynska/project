import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
}

interface ArticlesState {
  articles: Article[];
  loading: boolean;
  totalArticles: number;
  currentPage: number;
  articlesPerPage: number;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  totalArticles: 0,
  currentPage: parseInt(localStorage.getItem('currentPage') || '0', 10),
  articlesPerPage: 8,
  error: null,
};

const API_KEY = '743c242b48f04ba397a3232a5838dad6';
const API_URL = `https://newsapi.org/v2/everything?q=apple&from=2025-01-13&to=2025-01-13&sortBy=popularity&apiKey=${API_KEY}`;

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page: number) => {
    const response = await axios.get(API_URL, {
      params: {
        page: page + 1,
        pageSize: 8,
      },
    });
    return response.data;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      localStorage.setItem('currentPage', action.payload.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalArticles = action.payload.totalResults;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      });
  },
});

export const { setCurrentPage } = articlesSlice.actions;

export default articlesSlice.reducer;
