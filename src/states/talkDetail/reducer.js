import { ActionType } from './action';

function talkDetailReducer(talkDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_TALK_DETAIL:
    return action.payload.talkDetail;
  case ActionType.CLEAR_TALK_DETAIL:
    return null;
  case ActionType.TOGGLE_LIKE_TALK_DETAIL: {
    const isUpvoted = talkDetail.upVotesBy?.includes(action.payload.userId);
    return {
      ...talkDetail,
      upVotesBy: isUpvoted
        ? talkDetail.upVotesBy.filter((id) => id !== action.payload.userId)
        : talkDetail.upVotesBy.concat(action.payload.userId),
      downVotesBy:
          talkDetail.downVotesBy?.filter(
            (id) => id !== action.payload.userId,
          ) || [],
    };
  }
  case ActionType.ADD_COMMENT:
    return {
      ...talkDetail,
      comments: [action.payload.comment, ...(talkDetail.comments || [])],
    };
  default:
    return talkDetail;
  }
}

export default talkDetailReducer;
