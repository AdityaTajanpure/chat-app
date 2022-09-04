import React from "react";
import "./NewMessageForm.css";

const NewMessageForm = ({
  newMessage,
  handleNewMessageChange,
  handleStartTyping,
  handleStopTyping,
  handleSendMessage,
}) => {
  return (
    <form className="ui form">
      <div className="field">
        <label>Add Message :</label>
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          onKeyPress={handleStartTyping}
          onKeyUp={handleStopTyping}
        />
      </div>
      <button
        type="submit"
        onClick={handleSendMessage}
        className="ui button blue btn-primary"
      >
        Send
      </button>
    </form>
  );
};

export default NewMessageForm;
