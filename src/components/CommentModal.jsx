/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { asyncAddCommentInArticle, asyncLikeCommentInArticle } from '../slices/articleSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    overflow: 'scroll',
    height: '70%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#ReactModalContainer');

function CommentModal({
  isModalOpen, setIsModalOpen, article,
}) {
  const dispatch = useDispatch();
  const [comment_value, setCommentValue] = useState('');

  const handleClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleComment = () => {
    const article_info = { article_id: article?.id, comment_value, id: uuid() };
    dispatch(
      asyncAddCommentInArticle(article_info),
    );
    setIsModalOpen(!isModalOpen);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleComment();
  };

  const handleLike = (comment_id) => {
    const id_group = { article_id: article?.id, comment_id };
    dispatch(asyncLikeCommentInArticle(id_group));
  };

  return (
    <div className="">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={setIsModalOpen}
        style={customStyles}
      >
        <div className="w-fit ml-auto">
          <button
            onClick={handleClose}
            className="bg-[#3944f7] rounded-0 px-3 py-1 text-[#ffffff]"
          >
            Close
          </button>
        </div>
        <div className="my-10">
          <p className="text-2xl font-bold">
            Comment on: &nbsp;
            {article?.article_name}
          </p>
          <div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Write Something"
                className="border-2 w-full px-5 py-2 rounded-lg"
                value={comment_value}
                onChange={(e) => setCommentValue(e.target.value)}
              />
            </div>
            <div className="my-3">
              <button
                onClick={handleClick}
                className="bg-[#3944f7] px-5 py-3 rounded-lg text-2xl text-[#ffffff] w-full"
              >
                Comment

              </button>
            </div>
          </div>
        </div>
        <div className="">
          {
            article?.comments.map((commentObj, idx) => (
              <div key={idx} className="border-2 px-2 py-2 my-2 rounded-lg">
                <span className="flex item-center justify-between">
                  <p className="text-xl font-bold capitalize">{commentObj?.comment}</p>
                  <p>
                    {commentObj?.likes}
                    {' '}
                    Likes
                  </p>
                </span>
                <button onClick={() => handleLike(commentObj.id)} className="bg-[#3944f7] px-3 py-2 rounded-lg text-xl text-[#ffffff] w-full my-3">Like Comment</button>
              </div>
            ))
          }
        </div>
      </Modal>
    </div>
  );
}

export default CommentModal;
