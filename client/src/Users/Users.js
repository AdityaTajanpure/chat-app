import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

import "./Users.css";

const Users = ({ users }) => {
  return (
    <div>
      <h3 className="title">
        {users.length > 0 ? "" : "There is no one else in this room:"}
      </h3>
      <ul className="user-list">
        {users.length > 0 &&
          users.map((user, index) => (
            <li key={index} className="user-box">
              <span>{user.name}</span>
              <UserAvatar user={user}></UserAvatar>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
