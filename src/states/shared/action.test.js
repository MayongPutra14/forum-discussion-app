/**
 * Scenario testing asyncPopulateUsersAndTalks thunk.
 *
 * - asyncPopulateUsersAndTalks function
 *   - should dispatch action correctly when data fetching succeeds
 *   - should dispatch action and call alert correctly when data fetching fails
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';
import { asyncPopulateUsersAndTalks } from './action';

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User 1',
    email: 'user1@example.com',
  },
];

const fakeTalksResponse = [
  {
    id: 'talk-1',
    text: 'Talk 1',
    user: 'user-1',
  },
];

const fakeErrorResponse = new Error('Something went wrong');

describe('asyncPopulateUsersAndTalks thunk', () => {
  beforeEach(() => {
    // backup & mock API functions
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;

    // mock alert
    window.alert = vi.fn();
  });

  afterEach(() => {
    // Turn back function API.
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching succeeds', async () => {
    // 1. Arrange (Mocking API implementation)
    api.getAllUsers = vi.fn().mockResolvedValue(fakeUsersResponse);
    api.getAllThreads = vi.fn().mockResolvedValue(fakeTalksResponse);

    const dispatch = vi.fn();

    // 2. Action
    await asyncPopulateUsersAndTalks()(dispatch);

    // 3. Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveTalksActionCreator(fakeTalksResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching fails', async () => {
    // 1. Arrange (Mocking API rejection)
    api.getAllUsers = vi.fn().mockRejectedValue(fakeErrorResponse);
    api.getAllThreads = vi.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();

    // 2. Action
    await asyncPopulateUsersAndTalks()(dispatch);

    // 3. Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
