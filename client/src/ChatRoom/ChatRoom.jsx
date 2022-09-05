import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./ChatRoom.css";
import useChat from "../useChat";
import ChatMessage from "../ChatMessage/ChatMessage";
import useTyping from "../useTyping";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import TypingMessage from "../TypingMessage/TypingMessage";
import Users from "../Users/Users";
import UserAvatar from "../UserAvatar/UserAvatar";

const ChatRoom = (props) => {
  const history = useHistory();
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

  // useEffect(() => {
  //   console.log(messages.at(-1));
  //   if (messages.at(-1).senderId !== localStorage.getItem("userId")) {
  //     var audio = new Audio(
  //       "https://firebasestorage.googleapis.com/v0/b/chattie-45cf4.appspot.com/o/iphone_ding.mp3?alt=media&token=6d86a527-de7d-4210-a710-4d66206b9b43"
  //     );
  //     setTimeout(() => {
  //       console.log(messages);
  //       audio.play();
  //       messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  //     }, 500);
  //   }
  // }, [messages]);

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <>
      <header className="app-header">
        <h3>React Chat</h3>
        <div>
          <div className="app-header">
            <button
              className="fluid ui button blue btn-primary"
              onClick={async () => {
                navigator.clipboard.writeText(window.location.href);
                alert("Chat room url copied to your clipboard");
              }}
            >
              Invite
            </button>
            {sessionStorage.getItem("isAuthenticated") && user ? (
              <>
                <UserAvatar user={user}></UserAvatar>
                {"    " + user.name}
              </>
            ) : (
              <button
                className="fluid ui button blue btn-primary"
                onClick={() => {
                  history.replace("/");
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="chat-room-container">
        <div className="chat-room-top-bar"></div>
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
