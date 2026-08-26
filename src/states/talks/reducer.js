import { ActionType } from './action';

function talksReducer(talks = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_TALK:
    return action.payload.talks;
  case ActionType.ADD_TALK:
    return [action.payload.talk, ...talks];
  case ActionType.TOGGLE_LIKE_TALK:
    return talks.map((talk) => {
      if (talk.id === action.payload.talkId) {
        const currentUpVotes = talk.upVotesBy || [];
        const currentDownVotes = talk.downVotesBy || [];

        const isUpvoted = currentUpVotes.includes(action.payload.userId);

        return {
          ...talk,
          upVotesBy: isUpvoted
            ? currentUpVotes.filter((id) => id !== action.payload.userId)
            : currentUpVotes.concat([action.payload.userId]),
          downVotesBy: currentDownVotes.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
      return talk;
    });
  default:
    return talks;
  }
}

export default talksReducer;
