/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';

function AddArticleForm({
  handleSubmit, setArticleImage, setArticleName, setAuthorName, article_title, article_image, author_name,
}) {
  return (
    <form onSubmit={handleSubmit} className="">
      <div className="my-5">
        <input type="text" name="article_title" className="border-2 w-full px-5 py-2 rounded-lg" value={article_title} onChange={(e) => setArticleName(e.target.value)} placeholder="Enter Article Title" />
      </div>

      <div className="my-5">
        <input type="text" name="article_image" className="border-2 w-full px-5 py-2 rounded-lg" value={article_image} onChange={(e) => setArticleImage(e.target.value)} placeholder="Enter Article Image" />
      </div>

      <div className="my-5">
        <input type="text" name="author_name" className="border-2 w-full px-5 py-2 rounded-lg" value={author_name} onChange={(e) => setAuthorName(e.target.value)} placeholder="Enter Author Name" />
      </div>

      <div className="my-5">
        <button type="submit" className="bg-[#3944f7] px-5 py-3 rounded-lg text-2xl text-[#ffffff] w-full">Add Article</button>
      </div>
    </form>
  );
}

export default AddArticleForm;
