import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TalkReplyInput({ replyTalk }) {
  const [text, setText] = useState('');
  function replyTalkHandler() {
    if (text.trim()) {
      replyTalk(text);
      setText('');
    }
  }

  function handleTextChange({ target }) {
    setText(target.value);
  }

  return (
    <div className="talk-reply-input">
      <textarea
        placeholder="Talk your reply"
        value={text}
        onChange={handleTextChange}
      />

      <button type="submit" onClick={replyTalkHandler}>
        Reply
      </button>
    </div>
  );
}

TalkReplyInput.propTypes = {
  replyTalk: PropTypes.func.isRequired,
};

export default TalkReplyInput;
