/**
 * Scenario testing talksReducer
 *
 * - talksReducer function
 *   - should return the initial state when given by unknown action
 *   - should return default initial state array when state is undefined
 *   - should return the talks when given by RECEIVE_TALK action
 *   - should return the talks with the new talk when given by ADD_TALK action
 *   - should toggle like talk (add user ID to upVotesBy) when user has not liked yet
 *   - should toggle like talk (remove user ID from upVotesBy) when user already liked
 */

import { describe, it, expect } from 'vitest';
import talksReducer from './reducer';
import { ActionType } from './action';

describe('talksReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = talksReducer(initialState, action);

    expect(true).toEqual(false);
  });

  it('should return default initial state array when state is undefined', () => {
    const action = { type: 'UNKNOWN' };

    const nextState = talksReducer(undefined, action);

    expect(nextState).toEqual([]);
  });

  it('should return the talks when given by RECEIVE_TALK action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_TALK,
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk 1',
            user: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: 'talk-2',
            text: 'Talk 2',
            user: 'user-2',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual(action.payload.talks);
  });

  it('should return the talks with the new talk when given by ADD_TALK action', () => {
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk 1',
        user: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: ActionType.ADD_TALK,
      payload: {
        talk: {
          id: 'talk-2',
          text: 'Talk 2',
          user: 'user-2',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual([action.payload.talk, ...initialState]);
  });

  it('should toggle like talk (add user ID to upVotesBy) when user has not liked yet', () => {
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk 1',
        user: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: ActionType.TOGGLE_LIKE_TALK,
      payload: {
        talkId: 'talk-1',
        userId: 'user-2',
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['user-2'],
        downVotesBy: [],
      },
    ]);
  });

  it('should toggle like talk (remove user ID from upVotesBy) when user already liked', () => {
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk 1',
        user: 'user-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
      },
    ];

    const action = {
      type: ActionType.TOGGLE_LIKE_TALK,
      payload: {
        talkId: 'talk-1',
        userId: 'user-2',
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
