/**
 * Scenario testing TalkInput component.
 *
 * - TalkInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addTalk function when post button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TalkInput from './TalkInput';

describe('TalkInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // 1. Arrange
    render(<TalkInput addTalk={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Discussion title');

    // 2. Action
    await userEvent.type(titleInput, 'Judul Diskusi Baru');

    // 3. Assert
    expect(titleInput).toHaveValue('Judul Diskusi Baru');
  });

  it('should handle category typing correctly', async () => {
    // 1. Arrange
    render(<TalkInput addTalk={() => {}} />);
    const categoryInput = screen.getByPlaceholderText('Category (optional)');

    // 2. Action
    await userEvent.type(categoryInput, 'react');

    // 3. Assert
    expect(categoryInput).toHaveValue('react');
  });

  it('should handle body typing correctly', async () => {
    // 1. Arrange
    render(<TalkInput addTalk={() => {}} />);
    const bodyInput = screen.getByPlaceholderText('What are you thinking?');

    // 2. Action
    await userEvent.type(bodyInput, 'Ini isi konten diskusi baru.');

    // 3. Assert
    expect(bodyInput).toHaveValue('Ini isi konten diskusi baru.');
  });

  it('should call addTalk function when post button is clicked', async () => {
    // 1. Arrange
    const mockAddTalk = vi.fn();
    render(<TalkInput addTalk={mockAddTalk} />);
    const titleInput = screen.getByPlaceholderText('Discussion title');
    const categoryInput = screen.getByPlaceholderText('Category (optional)');
    const bodyInput = screen.getByPlaceholderText('What are you thinking?');
    const postButton = screen.getByRole('button', { name: 'Post Threads' });

    // 2. Action
    await userEvent.type(titleInput, 'Judul Diskusi Baru');
    await userEvent.type(categoryInput, 'react');
    await userEvent.type(bodyInput, 'Ini isi konten diskusi baru.');
    await userEvent.click(postButton);

    // 3. Assert
    expect(mockAddTalk).toHaveBeenCalledWith({
      title: 'Judul Diskusi Baru',
      category: 'react',
      body: 'Ini isi konten diskusi baru.',
    });
  });
});
