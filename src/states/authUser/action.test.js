/**
 * Scenario testing asyncSetAuthUser thunk.
 *
 * - asyncSetAuthUser function
 *   - should dispatch action and return true when login succeeds
 *   - should dispatch action, call alert, and return false when login fails
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

const fakeTokenResponse = 'fake-access-token';
const fakeAuthUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
};

const fakeErrorResponse = new Error('Invalid email or password');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;

    window.alert = vi.fn();
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch action and return true when login succeeds', async () => {
    // 1. Arrange
    api.login = vi.fn().mockResolvedValue(fakeTokenResponse);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeAuthUserResponse);

    const dispatch = vi.fn();

    // 2. Action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);

    // 3. Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeTokenResponse);
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(true);
  });

  it('should dispatch action, call alert, and return false when login fails', async () => {
    // 1. Arrange
    api.login = vi.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();

    // 2. Action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'wrongpassword',
    })(dispatch);

    // 3. Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(false);
  });
});
