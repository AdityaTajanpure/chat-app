import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./ChatRoom.css";
import useChat from "../useChat";
import ChatMessage from "../ChatMessage/ChatMessage";
import useTyping from "../useTyping";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import TypingMessage from "../TypingMessage/TypingMessage";
import Users from "../Users/Users";
import UserAvatar from "../UserAvatar/UserAvatar";

const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  const messagesRef = useRef();
  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <>
      <header className="app-header">React Chat</header>

      <div className="chat-room-container">
        <div className="chat-room-top-bar">
          {user && (
            <>
              <UserAvatar user={user}></UserAvatar>
              {"    " + user.name}
            </>
          )}
        </div>
        <Users users={users}></Users>
        <div className="messages-container" ref={messagesRef}>
          <ol className="messages-list">
            {messages.map((message, i) => (
              <li key={i}>
                <ChatMessage message={message}></ChatMessage>
              </li>
            ))}
            {typingUsers.map((user, i) => (
              <li key={messages.length + i}>
                <TypingMessage user={user}></TypingMessage>
              </li>
            ))}
          </ol>
        </div>
        <NewMessageForm
          className="sticky-bottom"
          newMessage={newMessage}
          handleNewMessageChange={handleNewMessageChange}
          handleStartTyping={startTyping}
          handleStopTyping={stopTyping}
          handleSendMessage={(e) => {
            handleSendMessage(e);
            setTimeout(() => {
              messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
            }, 500);
          }}
        ></NewMessageForm>
      </div>
    </>
  );
};

export default ChatRoom;
