import React, { Component } from "react";
import axios from 'axios';
import ListContainer from "./container/ListContainer";
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <ListContainer />
      </div>
    );
  }
}

export default App;
