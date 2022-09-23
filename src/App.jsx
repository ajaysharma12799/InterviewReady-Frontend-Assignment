/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import AddArticleForm from './components/AddArticleForm';
import ArticleCard from './components/ArticleCard';
import { asyncFetchAllArticles, asyncAddArticle } from './slices/articleSlice';

function App() {
  const { articles } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const [article_title, setArticleName] = useState('');
  const [article_image, setArticleImage] = useState('');
  const [author_name, setAuthorName] = useState('');
  const [postQuery, setPostQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuid();
    const new_article = {
      id, article_title, article_image, author_name, likes: 0, comments: [],
    };
    dispatch(asyncAddArticle(new_article));
  };

  useEffect(() => {
    dispatch(asyncFetchAllArticles());
  }, [dispatch]);

  const filteredArticles = articles.filter((post) => post?.article_title.toLowerCase().includes(postQuery.toLowerCase()));

  return (
    <div className="container mx-auto w-[90%] md:w-full">
      <AddArticleForm handleSubmit={handleSubmit} setArticleName={setArticleName} setArticleImage={setArticleImage} setAuthorName={setAuthorName} article_image={article_image} article_title={article_title} author_name={author_name} />

      <div>
        <p className="text-2xl">All Articles</p>
        <div className="my-2">
          <input type="text" name="search_article" className="border-2 w-full px-5 py-2 rounded-lg" value={postQuery} onChange={(e) => setPostQuery(e.target.value)} placeholder="Search Article by Title or Author Name" />
        </div>
        <div>
          {
            filteredArticles.length === 0 ? (
              <div className="container mx-auto my-10">
                <h1 className="text-3xl text-center font-bold">No Articles Present</h1>
              </div>
            ) : (
              filteredArticles.map((post) => (
                <ArticleCard post={post} key={post?.id} />
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
