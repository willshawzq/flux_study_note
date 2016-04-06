import AppDispatcher from "./AppDispatcher";
import bankConstants from "./constants";
/**
*这里定义了一个动作App动作事件集合
*/
export default {
    createAccount() {
      AppDispatcher.dispatch({
          type: bankConstants.CREATED_ACCOUNT,
          ammount: 0
      });
    },
    // 以存钱为例，存钱这个动作实际上是调用了事件分发器的事件派遣函数
    // 并向事件派遣函数传入了一个包含动作类型和金额的对象
    depositIntoAccount(ammount) {
      AppDispatcher.dispatch({
          // type告诉分发器发生了什么事，应该把事件指给谁；(是必须的)
          type: bankConstants.DEPOSITED_INTO_ACCOUNT,
          // 用于银行流水的金额，也就是用于做业务处理的参数
          ammount: ammount
      });
    },
    withdrawFromAccount(ammount) {
      AppDispatcher.dispatch({
          type: bankConstants.WITHDREW_FROM_ACCOUNT,
          ammount: ammount
      });
    }
};
