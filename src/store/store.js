import loginReducer from '../reducers/loginReducer'
import appReducer from '../reducers/appReducer'
import listUserReducer from '../reducers/listUserReducer'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'
import { createStore, combineReducers, compose } from 'redux'
//var redux = require("redux");


const allReducers = combineReducers({
    loginReducer:loginReducer,
    appReducer:appReducer,
    firebase: firebaseReducer,
    listUserReducer:listUserReducer
    
})
const rrfConfig = {
    userProfile: 'users',
}
//var store1 = redux.createStore(allReducers);
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
  )(createStore)

const initialState = {}
const store1 = createStoreWithFirebase(allReducers, initialState);
store1.subscribe(() => {  // mỗi lần thay đổi state nó sẽ bắt sự kiện trong đấy 
    //console.log(store1.getState());
});
export default store1;