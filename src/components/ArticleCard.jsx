/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncUpdateArticleLike } from '../slices/articleSlice';
import CommentModal from './CommentModal';

function ArticleCard({ post }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (id) => {
    dispatch(asyncUpdateArticleLike(id));
  };

  return (
    <div className="border-2 rounded-lg w-full my-3 mx-auto flex flex-col md:flex-row cursor-pointer">
      <span className="w-[100%] md:w-[20%]">
        <img
          src={post?.article_image}
          alt={post?.article_title}
          className="w-full rounded-lg"
        />
      </span>
      <span className="px-5 py-3">
        <div className="">
          <p className="text-3xl font-bold">{post?.article_title}</p>
          <p className="text-xl my-2">
            By:
            {' '}
            {post?.author_name}
          </p>
          <p>
            {post?.likes}
            {' '}
            Likes
          </p>
        </div>
        <div className="my-3 flex items-center gap-3">
          <button
            onClick={() => handleLike(post?.id)}
            className="bg-[#3944f7] text-[#ffffff] px-3 py-1 rounded-md"
          >
            Like Article
          </button>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="bg-[#3944f7] text-[#ffffff] px-3 py-1 rounded-md"
          >
            Comment
          </button>
        </div>
      </span>
      <CommentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        article={post}
        article_name={post?.article_title}
        article_comments={post?.comments}
      />
    </div>
  );
}

export default ArticleCard;
