import React, { Component } from "react";
import DictionaryForm from "./dictionaryForm";
import DictionaryList from "./dictionaryList";
import Home from "./home";

class Dictionary extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Home />
        <div className="container">
          <DictionaryForm />
          <DictionaryList />
        </div>
      </React.Fragment>
    );
  }
}

export default Dictionary;
