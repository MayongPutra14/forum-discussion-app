/**
 * Scenario testing TalkInput component.
 *
 * - TalkInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addTalk function when post button is clicked
 *   - should not call addTalk function when title or body is empty
 *   - should reset inputs after successfully calling addTalk
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
    render(<TalkInput addTalk={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Discussion title');

    await userEvent.type(titleInput, 'Judul Diskusi Baru');

    expect(titleInput).toHaveValue('Judul Diskusi Baru');
  });

  it('should handle category typing correctly', async () => {
    render(<TalkInput addTalk={() => {}} />);
    const categoryInput = screen.getByPlaceholderText('Category (optional)');

    await userEvent.type(categoryInput, 'react');

    expect(categoryInput).toHaveValue('react');
  });

  it('should handle body typing correctly', async () => {
    render(<TalkInput addTalk={() => {}} />);
    const bodyInput = screen.getByPlaceholderText('What are you thinking?');

    await userEvent.type(bodyInput, 'Ini isi konten diskusi baru.');

    expect(bodyInput).toHaveValue('Ini isi konten diskusi baru.');
  });

  it('should call addTalk function when post button is clicked', async () => {
    const mockAddTalk = vi.fn();
    render(<TalkInput addTalk={mockAddTalk} />);
    const titleInput = screen.getByPlaceholderText('Discussion title');
    const categoryInput = screen.getByPlaceholderText('Category (optional)');
    const bodyInput = screen.getByPlaceholderText('What are you thinking?');
    const postButton = screen.getByRole('button', { name: 'Post Threads' });

    await userEvent.type(titleInput, 'Judul Diskusi Baru');
    await userEvent.type(categoryInput, 'react');
    await userEvent.type(bodyInput, 'Ini isi konten diskusi baru.');
    await userEvent.click(postButton);

    expect(mockAddTalk).toHaveBeenCalledWith({
      title: 'Judul Diskusi Baru',
      category: 'react',
      body: 'Ini isi konten diskusi baru.',
    });
  });

  it('should not call addTalk function when title or body is empty', async () => {
    const mockAddTalk = vi.fn();
    render(<TalkInput addTalk={mockAddTalk} />);
    const titleInput = screen.getByPlaceholderText('Discussion title');
    const postButton = screen.getByRole('button', { name: 'Post Threads' });

    // Hanya mengisi title tanpa body
    await userEvent.type(titleInput, 'Judul Diskusi Saja');
    await userEvent.click(postButton);

    expect(mockAddTalk).not.toHaveBeenCalled();
  });

  it('should reset inputs after successfully calling addTalk', async () => {
    const mockAddTalk = vi.fn();
    render(<TalkInput addTalk={mockAddTalk} />);
    const titleInput = screen.getByPlaceholderText('Discussion title');
    const categoryInput = screen.getByPlaceholderText('Category (optional)');
    const bodyInput = screen.getByPlaceholderText('What are you thinking?');
    const postButton = screen.getByRole('button', { name: 'Post Threads' });

    await userEvent.type(titleInput, 'Judul Diskusi Baru');
    await userEvent.type(categoryInput, 'react');
    await userEvent.type(bodyInput, 'Ini isi konten diskusi baru.');
    await userEvent.click(postButton);

    expect(titleInput).toHaveValue('');
    expect(categoryInput).toHaveValue('');
    expect(bodyInput).toHaveValue('');
  });
});
