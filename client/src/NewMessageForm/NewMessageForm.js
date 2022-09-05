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
    <form className="ui form" autoComplete="false">
      <div className="field">
        <label>Add Message :</label>

        <input
          type="password"
          id="disable-pwd-mgr-1"
          style={{ display: "none" }}
          defaultValue="stop-pwd-mgr-1"
        />
        <input
          type="password"
          id="disable-pwd-mgr-2"
          style={{ display: "none" }}
          defaultValue="stop-pwd-mgr-2"
        />

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
