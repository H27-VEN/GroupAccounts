import React, { Component } from "react";
import "./GroupList.css";

export default class GroupList extends Component {
  constructor(props) {
    super(props);
    this.initializeState = this.initializeState.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.state = this.initializeState();
  }

  initializeState() {
    console.log(this.props);
    const list = {};
    for (let i = 0; i < this.props.list.length; i++) {
      list[this.props.list[i].id] = false;
    }
    return { list };
  }

  handleCheckChange(event) {
    const { id, checked } = event.target;
    this.setState(
      state => {
        const currentState = { ...state };
        currentState.list[id] = checked;
        return currentState;
      },
      () => {
        this.props.manageGroupCheck(id, checked);
      }
    );
  }

  extractList() {
    const groupList = [];
    for (let i = 0; i < this.props.list.length; i += 1) {
      groupList[i] = (
        <li key={i}>
          <input
            type="checkbox"
            id={this.props.list[i].id}
            defaultChecked={this.state.list[this.props.list[i].id]}
            onChange={this.handleCheckChange}
          />
          {this.props.list[i].name}
        </li>
      );
    }
    return groupList;
  }

  render() {
    const groupList = this.extractList();
    return <ul className="grouplist">{groupList}</ul>;
  }
}
