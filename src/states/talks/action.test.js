/**
 * Scenario testing for talks thunk functions
 *
 * - asyncAddTalk thunk
 *   - should dispatch action correctly when data fetching succeeds
 *   - should dispatch action and call alert when data fetching fails
 *
 * - asyncToggleLikeTalk thunk
 *   - should dispatch action and call api.upVoteThread when talk is not upvoted
 *   - should dispatch action and rollback when data fetching fails
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncAddTalk,
  asyncToggleLikeTalk,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
} from './action';

const fakeTalkResponse = {
  id: 'talk-1',
  title: 'Test Title',
  body: 'Test Body',
  category: 'general',
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error('Something went wrong');

describe('asyncAddTalk thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    window._alert = window.alert;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    window.alert = window._alert;
    delete api._createThread;
    delete window._alert;
  });

  it('should dispatch action correctly when data fetching succeeds', async () => {
    // Arrange
    api.createThread = vi.fn().mockResolvedValue(fakeTalkResponse);
    const dispatch = vi.fn();

    // Action
    await asyncAddTalk({
      title: 'Test Title',
      body: 'Test Body',
      category: 'general',
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addTalkActionCreator(fakeTalkResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching fails', async () => {
    // Arrange
    api.createThread = vi.fn().mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // Action
    await asyncAddTalk({
      title: 'Test Title',
      body: 'Test Body',
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncToggleLikeTalk thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;
    window._alert = window.alert;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;
    window.alert = window._alert;
    delete api._upVoteThread;
    delete api._neutralVoteThread;
    delete window._alert;
  });

  it('should dispatch action and call api.upVoteThread when talk is not upvoted', async () => {
    // Arrange
    api.upVoteThread = vi.fn().mockResolvedValue({});
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      talks: [
        {
          id: 'talk-1',
          upVotesBy: [],
        },
      ],
    });

    // Action
    await asyncToggleLikeTalk('talk-1')(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleLikeTalkActionCreator({ talkId: 'talk-1', userId: 'user-1' }),
    );
    expect(api.upVoteThread).toHaveBeenCalledWith('talk-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and rollback when data fetching fails', async () => {
    // Arrange
    api.upVoteThread = vi.fn().mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      talks: [
        {
          id: 'talk-1',
          upVotesBy: [],
        },
      ],
    });

    // Action
    await asyncToggleLikeTalk('talk-1')(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    // Dispatched twice for optimistic update and rollback
    expect(dispatch).toHaveBeenCalledWith(
      toggleLikeTalkActionCreator({ talkId: 'talk-1', userId: 'user-1' }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
