/**
 * Scenario testing talksReducer
 *
 * - talksReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the talks when given by RECEIVE_TALK action
 *   - should return the talks with the new talk when given by ADD_TALK action
 *   - should toggle like talk correctly when given by TOGGLE_LIKE_TALK action
 */

import { describe, it, expect } from 'vitest';
import talksReducer from './reducer';
import { ActionType } from './action';

describe('talksReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // 1. Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // 2. Action
    const nextState = talksReducer(initialState, action);

    // 3. Assert
    expect(nextState).toEqual('HARUS_ERROR');
  });

  it('should return the talks when given by RECEIVE_TALK action', () => {
    // 1. Arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_TALK,
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk 1',
            user: 'user-1',
          },
          {
            id: 'talk-2',
            text: 'Talk 2',
            user: 'user-2',
          },
        ],
      },
    };

    // 2. Action
    const nextState = talksReducer(initialState, action);

    // 3. Assert
    expect(nextState).toEqual(action.payload.talks);
  });

  it('should return the talks with the new talk when given by ADD_TALK action', () => {
    // 1. Arrange
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk 1',
        user: 'user-1',
      },
    ];

    const action = {
      type: ActionType.ADD_TALK,
      payload: {
        talk: {
          id: 'talk-2',
          text: 'Talk 2',
          user: 'user-2',
        },
      },
    };

    // 2. Action
    const nextState = talksReducer(initialState, action);

    // 3. Assert
    expect(nextState).toEqual([action.payload.talk, ...initialState]);
  });
});
