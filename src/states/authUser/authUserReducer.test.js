/**
 * Scenario testing authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the authUser when given by SET_AUTH_USER action
 *   - should return null when given by UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // 1. Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // 2. Action
    const nextState = authUserReducer(initialState, action);

    // 3. Assert
    expect(nextState).toBe(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // 1. Arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
    };

    // 2. Action
    const nextState = authUserReducer(initialState, action);

    // 3. Assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // 1. Arrange
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // 2. Action
    const nextState = authUserReducer(initialState, action);

    // 3. Assert
    expect(nextState).toBeNull();
  });
});
