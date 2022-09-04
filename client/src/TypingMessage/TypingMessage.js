import React from "react";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import Gravatar from "react-gravatar";
import "./TypingMessage.css";

const TypingMessage = ({ user }) => {
  return (
    <div className="message-item">
      <div className="message-avatar-container">
        <Gravatar
          email={user.email ?? user.name + "@gmail.com"}
          alt={user.name}
          title={user.name}
          className={"avatar"}
        ></Gravatar>
      </div>

      <TypingAnimation></TypingAnimation>
    </div>
  );
};

export default TypingMessage;
