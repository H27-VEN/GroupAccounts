import React, { Component } from "react";
import GroupList from "../component/GroupList";
import AccountList from "../component/AccountList";
import "./ListContainer.css";

export default class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.accountList = [
      { id: 1001, username: "animesh", type: "facebook" },
      { id: 2001, username: "Dave Corner", type: "vk" },
      { id: 3001, username: "Creative Glance", type: "twitter" },
      { id: 4001, username: "David John", type: "twitter" },
      { id: 5001, username: "jigar test account", type: "instagram" },
      { id: 6001, username: "Nehal SocialPilot", type: "twitter" },
      { id: 7001, username: "Ravi Test", type: "linkedin" },
      { id: 8001, username: "Dilip", type: "facebook" },
      { id: 9001, username: "Jimit Bagadiya", type: "facebook" },
      { id: 10001, username: "Android", type: "facebook" }
    ];
    this.groupList = [
      { id: 1, name: "group1" },
      { id: 2, name: "group2" },
      { id: 3, name: "group3" }
    ];
    this.groupAccountMap = {
      1: [1001, 2001, 3001],
      2: [3001, 4001, 5001, 6001],
      3: [5001, 6001, 7001]
    };
    this.accountInfoMap = {
      1001: { username: "animesh", type: "facebook", groupChecked: null },
      2001: { username: "Dave Corner", type: "vk", groupChecked: null },
      3001: {
        username: "Creative Glance",
        type: "twitter",
        groupChecked: null
      },
      4001: { username: "David John", type: "twitter", groupChecked: null },
      5001: {
        username: "jigar test account",
        type: "instagram",
        groupChecked: null
      },
      6001: {
        username: "Nehal SocialPilot",
        type: "linkedin",
        groupChecked: null
      },
      7001: { username: "Ravi Test", type: "linkedin", groupChecked: null },
      8001: { username: "Dilip", type: "facebook", groupChecked: null },
      9001: {
        username: "Jimit Bagadiya",
        type: "facebook",
        groupChecked: null
      },
      10001: { username: "Android", type: "facebook", groupChecked: null }
    };
    this.initializeState = this.initializeState.bind(this);
    this.handleAccountCheck = this.handleAccountCheck.bind(this);
    this.getAccountDetails = this.getAccountDetails.bind(this);
    this.manageGroupCheck = this.manageGroupCheck.bind(this);
    this.sortAccountsList = this.sortAccountsList.bind(this);
    this.sortAccountsList();
    this.state = this.initializeState();
  }

  initializeState() {
    const checkedAccounts = {};
    const accountsList = [];
    for (let i = 0; i < this.accountList.length; i++) {
      checkedAccounts[this.accountList[i].id] = false;
      accountsList[i] = this.accountList[i].id;
    }

    return {
      checkedAccounts,
      currentGroupCheckRank: 0,
      groupCheckRank: {},
      accountsList,
      currentGroupChecked: []
    };
  }

  sortAccountsList() {
    this.accountList.sort((account1, account2) => {
      return account1.username.toLowerCase() > account2.username.toLowerCase();
    });
  }

  handleAccountCheck(id, checked) {
    this.setState(state => {
      const currentState = { ...state };
      currentState.checkedAccounts[id] = checked;
      return currentState;
    });
  }

  getAccountDetails(accountId, info) {
    return this.accountInfoMap[accountId][info];
  }

  manageGroupCheck(groupId, checked) {
    const groupAccounts = this.groupAccountMap[groupId];
    this.setState(state => {
      const currentState = { ...state };
      if (checked) {
        currentState.currentGroupCheckRank += 1;
        currentState.groupCheckRank[groupId] =
          currentState.currentGroupCheckRank;
        groupAccounts.sort((account1Id, account2Id) => {
          return (
            this.accountInfoMap[account1Id].username.toLowerCase() >
            this.accountInfoMap[account2Id].username.toLowerCase()
          );
        });
        for (let i = 0; i < groupAccounts.length; i += 1) {
          currentState.accountsList.splice(
            currentState.accountsList.indexOf(groupAccounts[i]),
            1
          );
          currentState.accountsList.splice(i, 0, groupAccounts[i]);
        }
        // currentState.groupChecked.push(groupId);
      } else {
        currentState.currentGroupCheckRank -= 1;
        delete currentState.groupCheckRank[groupId];
        // if (currentGroupCheckRank !== 0) {
        //   currentState.accountsList.sort();
        // }
      }
      for (let i = 0; i < groupAccounts.length; i++) {
        currentState.checkedAccounts[groupAccounts[i]] = checked;
      }
      return currentState;
    });
  }

  render() {
    return (
      <div className="list">
        <div>
          <GroupList
            list={this.groupList}
            manageGroupCheck={this.manageGroupCheck}
          />
        </div>
        <div>
          <AccountList
            list={this.state.accountsList}
            checkedAccounts={this.state.checkedAccounts}
            //checkedAccountsList={this.state.checkedAccountsList}
            handleAccountCheck={this.handleAccountCheck}
            getAccountDetails={this.getAccountDetails}
          />
        </div>
      </div>
    );
  }
}
