import React, { useState } from "react";
import SendImage from'../assets/send1.png';

export default function Input({ onSend, botMessageLoading }) {
  const [text, setText] = useState("");

  const handleInputChange = e => {
    setText(e.target.value);
  };

  const handleSend = e => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input">
      <form onSubmit={handleSend}>
        <textarea
          onChange={handleInputChange}
          value={text}
          placeholder="Type your message here..."
          disabled={botMessageLoading}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
}


