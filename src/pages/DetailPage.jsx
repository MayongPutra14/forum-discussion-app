import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TalkDetail from '../components/TalkDetail';
import TalkReplyInput from '../components/TalkReplyInput';
import {
  asyncReceiveTalkDetail,
  asyncAddComment,
  asyncToggleLikeTalkDetail,
} from '../states/talkDetail/action';

function DetailPage() {
  const { id } = useParams();
  const talkDetail = useSelector((states) => states.talkDetail) || null;
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  const onLikeTalk = () => {
    dispatch(asyncToggleLikeTalkDetail());
  };

  const onComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  if (!talkDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <TalkDetail
        {...talkDetail}
        authUser={authUser ? authUser.id : null}
        likeTalk={onLikeTalk}
      />
      {authUser ? (
        <TalkReplyInput replyTalk={onComment} />
      ) : (
        <p className="detail-page__login-info">
          Silakan login untuk memberikan komentar.
        </p>
      )}
    </section>
  );
}

export default DetailPage;
