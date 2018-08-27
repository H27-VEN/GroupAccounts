import React, { Component } from "react";
import "./AccountList.css";

export default class AccountList extends Component {
  constructor(props) {
    super(props);
    // this.initializeState = this.initializeState.bind(this);
    // this.handleCheckChange = this.handleCheckChange.bind(this);
    // this.checkGroupAccounts = this.checkGroupAccounts.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    // this.state = this.initializeState();
    // console.log(this.state);
  }

  //   initializeState() {
  //     const checkedAccounts = {};
  //     for (let i = 0; i < this.props.list.length; i++) {
  //       checkedAccounts[this.props.list[i].id] = false;
  //     }
  //     return { checkedAccounts };
  //   }

  //   handleCheckChange(event) {
  //     const { id, checked } = event.target;
  //     this.setState(state => {
  //       const currentState = { ...state };
  //       currentState.checkedAccounts[id] = checked;
  //       return currentState;
  //     });
  //   }

  //   checkGroupAccounts(accounts, checked) {
  //     this.setState(state => {
  //       const currentState = { ...state };
  //       for (let i = 0; i < accounts.length; i++) {
  //         currentState.checkedAccounts[accounts[i]] = checked;
  //       }
  //       console.log(currentState);
  //       return currentState;
  //     });
  //   }

  handleCheck(event) {
    const { id, checked } = event.target;
    this.props.handleAccountCheck(id, checked);
  }

  extractList() {
    const accountList = [];
    console.log(this.props.checkedAccounts);
    // Object.entries(this.props.list).forEach(([key, value]) => {
    //});
    for (let i = 0; i < this.props.list.length; i += 1) {
      accountList.push(
        <li key={i}>
          <input
            type="checkbox"
            id={this.props.list[i]}
            // id={this.props.list[i].id}
            // checked={
            //   this.props.checkedAccountsList.indexOf(this.props.list[i].id) !==
            //   -1
            // }
            // defaultChecked={
            //   this.props.checkedAccountsList.indexOf(this.props.list[i].id) !==
            //   -1
            // }
            checked={this.props.checkedAccounts[this.props.list[i]]}
            defaultChecked={this.props.checkedAccounts[this.props.list[i]]} //{this.state.checkedAccounts[i]} {this.props.checkedAccounts[this.props.list[i]]} //{this.state.list[i]}
            onChange={this.handleCheck}
          />
          {this.props.getAccountDetails(this.props.list[i], "username")}
        </li>
      );
    }
    return accountList;
  }

  render() {
    const accountList = this.extractList();
    return <ul className="accountlist">{accountList}</ul>;
  }
}
