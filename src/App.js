import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/home";
import ToDos from "./components/todos";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Dictionary from "./components/dictionary";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/todos" component={ToDos} />
          <Route path="/dics" component={Dictionary} />
          {/* <Route path="/todo" component={ToDos} />
          <Route exact path="/" component={App} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
