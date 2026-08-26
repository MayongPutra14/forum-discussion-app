import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALK: 'RECEIVE_TALK',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALK,
    payload: {
      talks,
    },
  };
}

function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

function toggleLikeTalkActionCreator({ talkId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    },
  };
}

function asyncAddTalk({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.createThread({ title, body, category });
      dispatch(addTalkActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleLikeTalk(threadId) {
  return async (dispatch, getState) => {
    const { authUser, talks } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu!');
      return;
    }

    const targetThread = talks.find((talk) => talk.id === threadId);
    const isUpvoted = targetThread?.upVotesBy?.includes(authUser.id);

    dispatch(showLoading());
    dispatch(
      toggleLikeTalkActionCreator({ talkId: threadId, userId: authUser.id }),
    );

    try {
      if (isUpvoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleLikeTalkActionCreator({ talkId: threadId, userId: authUser.id }),
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveTalksActionCreator,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
  asyncAddTalk,
  asyncToggleLikeTalk,
};
