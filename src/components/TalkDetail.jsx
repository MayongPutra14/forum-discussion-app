import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { postedAt } from '../utils';
import parser from 'html-react-parser';

function TalkDetail({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy = [],
  owner,
  authUser,
  likeTalk,
  comments = [],
}) {
  const isTalkLiked = authUser ? upVotesBy.includes(authUser) : false;

  return (
    <section className="talk-detail">
      <header>
        <img src={owner.avatar} alt={owner.name} />
        <div className="talk-detail__user-info">
          <p className="talk-detail__user-name">{owner.name}</p>
          {category && (
            <span className="talk-detail__category">#{category}</span>
          )}
        </div>
      </header>
      <article>
        <h2 className="talk-detail__title">{title}</h2>
        <div className="talk-detail__text">{parser(body)}</div>
      </article>
      <footer>
        <div className="talk-detail__like">
          <button type="button" aria-label="like" onClick={() => likeTalk(id)}>
            {isTalkLiked ? (
              <FaHeart style={{ color: 'red' }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span>
            {upVotesBy.length} {upVotesBy.length === 1 ? 'Vote' : 'Votes'}
          </span>
        </div>
        <p className="talk-detail__created-at">{postedAt(createdAt)}</p>
      </footer>

      {/* Render Daftar Komentar */}
      <div className="talk-detail__comments">
        <h3>Komentar ({comments.length})</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="talk-detail__comment-item">
            <header>
              <img src={comment.owner.avatar} alt={comment.owner.name} />
              <p className="talk-detail__comment-author">
                {comment.owner.name}
              </p>
            </header>
            <p className="talk-detail__comment-body">{comment.content}</p>
            <small>{postedAt(comment.createdAt)}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

TalkDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  owner: PropTypes.shape(ownerShape).isRequired,
  authUser: PropTypes.string,
  likeTalk: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
};

TalkDetail.defaultProps = {
  category: '',
  upVotesBy: [],
  authUser: null,
  comments: [],
};

export default TalkDetail;
