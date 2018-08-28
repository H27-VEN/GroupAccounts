import React, { Component } from "react";
import "./AccountList.css";

export default class AccountList extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.state = {search: ''};
  }

  handleSearch(event) {
    const {id, value} = event.target;
    this.setState({
      [id]: value
    }, () => {
      this.props.handleSearch(value);
    });
  }

  handleSelectAll(event) {
    this.props.handleSelectAll(event.target.checked);
  }
  
  handleCheck(event) {
    const { id, checked } = event.target;
    this.props.handleAccountCheck(id, checked);
  }

  extractList() {
    const accountList = [];
    console.log(this.props.checkedAccounts);
    console.log('searched Accounts List in extractList method: ', this.props.searchedAccountsList);
    if(this.props.searchedAccountsList) {
      for(let i = 0; i < this.props.searchedAccountsList.length; i++) {
        accountList.push(
          <li key={i}>
            <input 
              type="checkbox"
              id={this.props.searchedAccountsList[i]}
              checked={this.props.checkedAccounts[this.props.searchedAccountsList[i]]}
              defaultChecked={this.props.checkedAccounts[this.props.searchedAccountsList[i]]} //{this.state.checkedAccounts[i]} {this.props.checkedAccounts[this.props.list[i]]} //{this.state.list[i]}
              onChange={this.handleCheck}
              disabled = {(this.props.checkedAccounts[this.props.searchedAccountsList[i]] === false && this.props.getAccountDetails(this.props.searchedAccountsList[i], 'type') === 'twitter' && this.props.isTwitterChecked === true )}
              />
              {this.props.getAccountDetails(this.props.searchedAccountsList[i], "username")}
          </li>
        )
      }
    }
    else {
      
    for (let i = 0; i < this.props.list.length; i += 1) {
      console.log(this.props.checkedAccounts[this.props.list[i]]);
      console.log(this.props.getAccountDetails(this.props.list[i], 'type'));
      console.log(this.props.isTwitterChecked);
      console.log('disable condition: ', (this.props.checkedAccounts[this.props.list[i]] === false && this.props.getAccountDetails(this.props.list[i], 'type') === 'twitter' && this.props.isTwitterChecked === true ));
      accountList.push(
        <li key={i}>
          <input
            type="checkbox"
            id={this.props.list[i]}
            checked={this.props.checkedAccounts[this.props.list[i]]}
            defaultChecked={this.props.checkedAccounts[this.props.list[i]]} //{this.state.checkedAccounts[i]} {this.props.checkedAccounts[this.props.list[i]]} //{this.state.list[i]}
            onChange={this.handleCheck}
            disabled = {(this.props.checkedAccounts[this.props.list[i]] === false && this.props.getAccountDetails(this.props.list[i], 'type') === 'twitter' && this.props.isTwitterChecked === true )}
          />
          {this.props.getAccountDetails(this.props.list[i], "username")}
        </li>
      );
    }
  }
    return accountList;
  }

  geCheckedAccountsLength() {
    let count = 0;
    console.log(this.props.checkedAccounts);
    Object.values(this.props.checkedAccounts).forEach((value) => {
      if(value === true) {
        count += 1;
      }
    });
    return count;
  }

  

  render() {
    const accountList = this.extractList();
  return (
      <div className="accounts-box">
        <div className="account-header">
          <input className="labelText" type="checkbox" id="selectAll" value="Select All" onChange={this.handleSelectAll} /> Select All
          <div className="labelCount">{this.geCheckedAccountsLength()}</div>
        </div>
        <input type="text" placeholder="search" id="search" value={this.state.search} onChange={this.handleSearch} />
        <ul className="accountlist">{accountList}</ul>
      </div>
    );
  }
}
