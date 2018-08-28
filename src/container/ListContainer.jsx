import React, { Component } from "react";
import GroupList from "../component/GroupList";
import AccountList from "../component/AccountList";
import sort from 'fast-sort';
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
      1001: { id: 1001, username: "animesh", type: "facebook", checkRank: 999 },
      2001: { id: 2001, username: "Dave Corner", type: "vk", checkRank: 999 },
      3001: {
        id: 3001,
        username: "Creative Glance",
        type: "twitter",
        checkRank: 999  
      },
      4001: { id: 4001, username: "David John", type: "twitter", checkRank: 999 },
      5001: {
        id: 5001,
        username: "jigar test account",
        type: "instagram",
        checkRank: 999
      },
      6001: {
        id: 6001,
        username: "Nehal SocialPilot",
        type: "twitter",
        checkRank: 999
      },
      7001: { id: 7001, username: "Ravi Test", type: "linkedin", checkRank: 999 },
      8001: { id: 8001, username: "Dilip", type: "facebook", checkRank: 999 },
      9001: {
        id: 9001,
        username: "Jimit Bagadiya",
        type: "facebook",
        checkRank: 999
      },
      10001: { id: 10001, username: "Android", type: "facebook", checkRank: 999 }
    };
    this.initializeState = this.initializeState.bind(this);
    this.handleAccountCheck = this.handleAccountCheck.bind(this);
    this.getAccountDetails = this.getAccountDetails.bind(this);
    this.manageGroupCheck = this.manageGroupCheck.bind(this);
    this.sortAccountsList = this.sortAccountsList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    
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
      searchedAccountsList: null,
      accountsList,
      twitterChecked: false
    };
  }

  sortAccountsList() {
    const accountsList = Object.values(this.accountInfoMap);
    sort(accountsList).asc(['checkRank', account => account.username.toLowerCase()]);
    this.accountList = accountsList;
  }

  handleSelectAll(checked) {
    this.setState((state) => {
        const currentState = {...state};
        if(checked) {
          for(let i = 0; i < this.accountList.length; i++) {
            if(this.accountList[i].type === 'twitter') {
             if(currentState.twitterChecked === false) {
              currentState.checkedAccounts[this.accountList[i].id] = true;
              currentState.twitterChecked = true;
             } 
            }
            else {
              currentState.checkedAccounts[this.accountList[i].id] = true;
            } 
          }
        }
        else {
          for(let i = 0; i < this.accountList.length; i++) {
            currentState.checkedAccounts[this.accountList[i].id] = false;
            currentState.twitterChecked = false;
          }
        }
        return currentState;
    });
  }

  handleAccountCheck(id, checked) {
    this.setState(state => {
      debugger;
      const currentState = { ...state };
      if(checked) {
        if(this.accountInfoMap[id].type === "twitter") {
          if(currentState.twitterChecked === false) {
            currentState.checkedAccounts[id] = checked;
            currentState.twitterChecked = true;
          }
        } else {
          currentState.checkedAccounts[id] = checked
        }
      } else {
        currentState.checkedAccounts[id] = checked;
        if(this.accountInfoMap[id].type === 'twitter') {
          currentState.twitterChecked = false;
        }
      }
      return currentState;    
    });
  }

  handleSearch(searchFilter = '') {
    this.setState((state) => {
      const currentState = { ...state };
      if(searchFilter.trim() === '') { 
        currentState.searchedAccountsList = null;
      }
      else {
        const searchedAccountsList = []; 
        const regexp = new RegExp(`${searchFilter.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1')}`, 'gi');
        const searchedAccounts = this.accountList.filter(listItem => listItem.username.match(regexp));
        for(let i = 0; i < searchedAccounts.length; i++) {
          searchedAccountsList.unshift(searchedAccounts[i].id);
        }
        currentState.searchedAccountsList = searchedAccountsList;
      }
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
        for(let i = 0; i < groupAccounts.length; i++) {
          if(this.accountInfoMap[groupAccounts[i]].checkRank === 999) {
            this.accountInfoMap[groupAccounts[i]].checkRank = currentState.currentGroupCheckRank;
            if(currentState.checkedAccounts[groupAccounts[i]] === false) {
              if(this.accountInfoMap[groupAccounts[i]].type === 'twitter') {
                if(currentState.twitterChecked === false) {
                  currentState.checkedAccounts[groupAccounts[i]] = true;
                  currentState.twitterChecked = true;
                }
              } else {
                  currentState.checkedAccounts[groupAccounts[i]] = true;
              } 
            } 
          } 
        }
        const accountsList = Object.values(this.accountInfoMap);
        console.log('accountsList: ',accountsList);
        sort(accountsList).asc(['checkRank', account => account.username.toLowerCase()]);
        console.log('accountsList after sort: ',accountsList);
       
         currentState.accountsList = [];
        for(let i = 0; i < accountsList.length; i++) {
          currentState.accountsList[i] = accountsList[i].id;
        }
        
      } else {
        currentState.currentGroupCheckRank -= 1;
        for(let i = 0; i < groupAccounts.length; i++) {
          this.accountInfoMap[groupAccounts[i]].checkRank = 999;
          currentState.checkedAccounts[groupAccounts[i]] = false;
          if(this.accountInfoMap[groupAccounts[i]].type === "twitter" && currentState.twitterChecked) {
            currentState.twitterChecked = false;
          }
        }

       const accountsList = Object.values(this.accountInfoMap);
        console.log('accountsList: ',accountsList);
        sort(accountsList).asc(['checkRank', account => account.username.toLowerCase()]);
        console.log('accountsList after sort: ',accountsList);
       
         currentState.accountsList = [];
        for(let i = 0; i < accountsList.length; i++) {
          currentState.accountsList[i] = accountsList[i].id;
        }
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
            handleSelectAll={this.handleSelectAll}
            checkedAccounts={this.state.checkedAccounts}
            searchedAccountsList={this.state.searchedAccountsList}
            handleAccountCheck={this.handleAccountCheck}
            getAccountDetails={this.getAccountDetails}
            isTwitterChecked={this.state.twitterChecked}
            handleSearch={this.handleSearch}
          />
        </div>
      </div>
    );
  }
}
