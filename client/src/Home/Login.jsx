import React from "react";
import "./Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const initialValues = {
    email: "",
    room: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();

  const joinRoom = async () => {
    localStorage.setItem("user", formValues.email);
    history.push(`/${formValues.room}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      joinRoom();
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.room) {
      errors.room = "Room id is required!";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Join a Chat Room</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p className="err-msg">{formErrors.email}</p>
          <div className="field">
            <label>Room :</label>
            <input
              type="text"
              name="room"
              placeholder="Room Id"
              value={formValues.room}
              onChange={handleChange}
            />
          </div>
          <p className="err-msg">{formErrors.room}</p>
          <button className="fluid ui button blue btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
