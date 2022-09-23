/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  loading: false,
};

const baseApi = 'http://localhost:3000/posts';

export const asyncFetchAllArticles = createAsyncThunk('/article/getAll', async () => {
  const responseObj = await fetch(baseApi, {
    method: 'GET',
  });
  const articles = await responseObj.json();
  return articles;
});

export const asyncAddArticle = createAsyncThunk('/article/addArticle', async (article, thunkAPI) => {
  const responseObj = await fetch(baseApi, {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (responseObj.status === 201) {
    thunkAPI.dispatch(asyncFetchAllArticles());
  }
  const response = await responseObj.json();
  return response;
});

export const asyncUpdateArticleLike = createAsyncThunk('/article/updateLike', async (article_id, thunkAPI) => {
  // Fetch Single Article
  const responseObj = await fetch(`${baseApi}/${article_id}`, {
    method: 'GET',
  });

  const exist_article = await responseObj.json();

  const updated_article = { ...exist_article, likes: exist_article.likes + 1 };

  const updatedArticleResponseObj = await fetch(`${baseApi}/${article_id}`, {
    method: 'PUT',
    body: JSON.stringify(updated_article),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (updatedArticleResponseObj.status === 200) {
    thunkAPI.dispatch(asyncFetchAllArticles());
  }
  const response = await updatedArticleResponseObj.json();
  return response;
});

export const asyncAddCommentInArticle = createAsyncThunk('/article/addComment', async (article_info, thunkAPI) => {
  const { article_id, comment_value, id } = article_info;
  // Fetch Single Article
  const responseObj = await fetch(`${baseApi}/${article_id}`, {
    method: 'GET',
  });

  const exist_article = await responseObj.json();

  const updated_article = {
    ...exist_article,
    comments: [...exist_article.comments, { comment: comment_value, id, likes: 0 }],
  };

  const updatedArticleResponseObj = await fetch(`${baseApi}/${article_id}`, {
    method: 'PUT',
    body: JSON.stringify(updated_article),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (updatedArticleResponseObj.status === 200) {
    thunkAPI.dispatch(asyncFetchAllArticles());
  }
  const response = await updatedArticleResponseObj.json();

  return response;
});

export const asyncLikeCommentInArticle = createAsyncThunk('/article/LikeComment', async (id_group, thunkAPI) => {
  const { article_id, comment_id } = id_group;
  // Fetch Single Article
  const responseObj = await fetch(`${baseApi}/${article_id}`, {
    method: 'GET',
  });

  const exist_article = await responseObj.json();
  const selected_comment_index = exist_article.comments.findIndex((comment) => comment.id === comment_id);
  const selected_comment = exist_article.comments.find((comment) => comment.id === comment_id);
  const updated_comment = { ...selected_comment, likes: selected_comment.likes + 1 };

  exist_article.comments.splice(selected_comment_index, 1, updated_comment);

  const updated_article = {
    ...exist_article,
    comments: [...exist_article.comments],
  };

  const updatedArticleResponseObj = await fetch(`${baseApi}/${article_id}`, {
    method: 'PUT',
    body: JSON.stringify(updated_article),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (updatedArticleResponseObj.status === 200) {
    thunkAPI.dispatch(asyncFetchAllArticles());
  }
  const response = await updatedArticleResponseObj.json();

  return response;
});

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
  },
  extraReducers: {
    // Fetch All Articles
    [asyncFetchAllArticles.pending]: (state, action) => {
      state.loading = true;
    },
    [asyncFetchAllArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    },

    // Add Article
    [asyncAddArticle.pending]: (state, action) => {
      state.loading = true;
    },
    [asyncAddArticle.fulfilled]: (state, action) => {
      state.loading = false;
    },

    // Update Article Like
    [asyncUpdateArticleLike.pending]: (state, action) => {
      state.loading = true;
    },
    [asyncUpdateArticleLike.fulfilled]: (state, action) => {
      state.loading = false;
    },

    // Add Comment in Article
    [asyncAddCommentInArticle.pending]: (state, action) => {
      state.loading = true;
    },
    [asyncAddCommentInArticle.fulfilled]: (state, action) => {
      state.loading = false;
    },

    // Like Comment in Article
    [asyncLikeCommentInArticle.pending]: (state, action) => {
      state.loading = true;
    },
    [asyncLikeCommentInArticle.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});

export default articleSlice.reducer;
