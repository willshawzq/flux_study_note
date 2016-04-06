import {EventEmitter} from 'fbemitter';
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';
// 定义响应事件的名称
const CHANGE_EVENT = 'change';
// 创建一个事件触发器
let __emitter = new EventEmitter(),
    //初始化个人账户
    balance = 0;

// 每个人的账户
let BankBalanceStore = {
    // 获取个人账户的金额
    getState() {
      return balance;
    },
    // 添加个人账户的处理事件
    addListener(callback) {
      return __emitter.addListener(CHANGE_EVENT, callback);
    }
};

// 通过调用事件分发器对象的注册方法，给个人账户添加了一个分发器标识
// 在有动作执行的时候，通过传入参数中的事件类型，来辨别不同的动作，
// 继而对个人账户金额进行操作
BankBalanceStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type) {
      case bankConstants.CREATED_ACCOUNT:
        balance = 0;
        // 操作结束后触发修改事件，即告诉用户银行处理结束，
        // 可以进行用户的后续行为（调用callback函数）
        __emitter.emit(CHANGE_EVENT);
        break;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        balance = balance + action.ammount;
        __emitter.emit(CHANGE_EVENT);
        break;
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        balance = balance - action.ammount;
        __emitter.emit(CHANGE_EVENT);
        break;
    }
});

export default BankBalanceStore;
