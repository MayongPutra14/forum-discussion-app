/**
 * Scenario testing for the LoginInput component.
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // 1. Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // 2. Action
    await userEvent.type(emailInput, 'john@example.com');

    // 3. Assert
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // 1. Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // 2. Action
    await userEvent.type(passwordInput, 'secretpassword');

    // 3. Assert
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call login function when login button is clicked', async () => {
    // 1. Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // 2. Action
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secretpassword');
    await userEvent.click(loginButton);

    // 3. Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'secretpassword',
    });
  });
});
