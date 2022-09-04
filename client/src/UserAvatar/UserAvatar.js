import React from "react";
import "./UserAvatar.css";
import Gravatar from "react-gravatar";

const UserAvatar = ({ user }) => {
  return (
    <>
      <Gravatar
        email={user.email ?? user.name + "@gmail.com"}
        alt={user.name}
        title={user.name}
        className={"avatar"}
      ></Gravatar>
    </>
  );
};

export default UserAvatar;
