import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Login from "./Home/Login";
import ChatRoom from "./ChatRoom/ChatRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/:roomId" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
