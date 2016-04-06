import React, { Component } from 'react';
import { render } from 'react-dom';
import BankBalanceStore from './BankBalanceStore';
import BankActions from './BankAction';

class App extends Component {
  /**
  *在构造函数中创建一个虚拟银行的用户，
  *完成state的初始化
  */
  constructor() {
      super(...arguments);
      BankActions.createAccount();
      this.state = {
        balance: BankBalanceStore.getState()
      }
  }
  componentDidMount() {
      // 给用户账户添加事件监听
      this.storeSubscription = BankBalanceStore.addListener(
          data => this.handleStoreChange()
      );
  }
  componentWillUnmount() {
      this.storeSubscription.remove();
  }
  handleStoreChange() {
      this.setState({
        balance: BankBalanceStore.getState()
      });
  }
  deposit() {
      // 执行不同的操作事件
      BankActions.depositIntoAccount(
        Number(this.refs.ammount.value)
      );
      this.refs.ammount.value = '';
  }
  withdraw() {
      BankActions.withdrawFromAccount(
          Number(this.refs.ammount.value)
      );
      this.refs.ammount.value = '';
  }
  render() {
    return (
            <div>
              <header>FluxTrust Bank</header>
              <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
              <div className="atm">
              <input type="text" placeholder="Enter Ammount" ref="ammount" />
              <br />
              <button onClick={this.withdraw.bind(this)}>Withdraw</button>
              <button onClick={this.deposit.bind(this)}>Deposit</button>
              </div>
            </div>
    );
  }
}

render(
    <App />,
    document.querySelector("#root")
);
