import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { postedAt } from '../utils';
import parser from 'html-react-parser';
import { motion } from 'motion/react';

function TalkItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy = [],
  totalComments = 0,
  user,
  authUser,
  like,
}) {
  const navigate = useNavigate();
  const isTalkLiked = authUser ? upVotesBy.includes(authUser) : false;

  const onLikeClick = (event) => {
    event.stopPropagation();
    like(id);
  };

  const onTalkClick = () => {
    navigate(`/threads/${id}`);
  };

  const onTalkPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="talk-item"
    >
      <div
        role="button"
        tabIndex={0}
        className="talk-item"
        onClick={onTalkClick}
        onKeyDown={onTalkPress}
      >
        <div className="talk-item__user-photo">
          <img
            src={user?.avatar || 'https://generated-image-url.jpg'}
            alt={user?.name || 'User Avatar'}
          />
        </div>
        <div className="talk-item__detail">
          <header>
            <div className="talk-item__user-info">
              <p className="talk-item__user-name">
                {user?.name || 'Unknown User'}
              </p>
              {category && (
                <span className="talk-item__category">#{category}</span>
              )}
            </div>
            <p className="talk-item__created-at">{postedAt(createdAt)}</p>
          </header>
          <article>
            <h3 className="talk-item__title">{title}</h3>
            <div className="talk-item__text">{parser(body)}</div>
          </article>
          <footer>
            <div className="talk-item__likes">
              <button type="button" aria-label="like" onClick={onLikeClick}>
                {isTalkLiked ? (
                  <FaHeart style={{ color: 'red' }} />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <span>{upVotesBy.length}</span>
            </div>
            <div className="talk-item__comments-count">
              <FaComment />
              <span>{totalComments}</span>
            </div>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const talkItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number,
  authUser: PropTypes.string,
  user: PropTypes.shape(userShape),
};

TalkItem.propTypes = {
  ...talkItemShape,
  like: PropTypes.func.isRequired,
};

TalkItem.defaultProps = {
  category: '',
  upVotesBy: [],
  totalComments: 0,
  authUser: null,
  user: null,
};

export { talkItemShape };
export default TalkItem;
