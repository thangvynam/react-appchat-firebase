import loginReducer from '../reducers/loginReducer'
import appReducer from '../reducers/appReducer'
var redux = require("redux");

const allReducers = redux.combineReducers({
    loginReducer:loginReducer,
    appReducer:appReducer
})
var store1 = redux.createStore(allReducers);
store1.subscribe(() => {  // mỗi lần thay đổi state nó sẽ bắt sự kiện trong đấy 
    console.log(store1.getState());
});
export default store1;