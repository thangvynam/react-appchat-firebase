import {CHECK_USER} from '../contsants/actionType'
const appInitialState = {
    user:null,
}
const appReducer = (state = appInitialState, action) => {
    switch (action.type) {
        case CHECK_USER:
            return {...state,user:action.user}
        default:
            return state
    }
}
export default appReducer;