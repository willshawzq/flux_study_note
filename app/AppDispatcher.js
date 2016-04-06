import {Dispatcher} from 'flux';
/**
*定义事件分发器
*/
class AppDispatcher extends Dispatcher {
    dispatch(action = {}) {
        console.log('Dispatched',action);
        //调用父类的事件分发函数
        super.dispatch(action);
    }
}
// 向外暴露一个新创建的对象
export default new AppDispatcher();
