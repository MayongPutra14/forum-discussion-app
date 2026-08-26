import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput.js';

function TalkInput({ addTalk }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, setBody] = useState('');

  function addTalkHandler() {
    if (title.trim() && body.trim()) {
      addTalk({ title, body, category });
      setTitle('');
      setCategory('');
      setBody('');
    }
  }

  function handleBodyChange({ target }) {
    setBody(target.value);
  }

  return (
    <div className="talk-input">
      <h3>Buat Diskusi Baru</h3>
      <input
        type="text"
        placeholder="Discussion title"
        value={title}
        onChange={onTitleChange}
        required
      />

      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={onCategoryChange}
        required
      />

      <textarea
        placeholder="What are you thinking?"
        value={body}
        onChange={handleBodyChange}
        required
      />

      <button type="button" onClick={addTalkHandler}>
        Post Threads
      </button>
    </div>
  );
}

TalkInput.propTypes = {
  addTalk: PropTypes.func.isRequired,
};

export default TalkInput;
