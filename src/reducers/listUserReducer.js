import {DETERMINE_USER} from '../contsants/actionType'
const listUserInitialState = {arrInfo:{}}
const listUserReducer = (state = listUserInitialState, action) => {
    switch (action.type) {
        case DETERMINE_USER:
            return {...state,arrInfo:action.arrInfo}
        default:
            return state
    }
}
export default listUserReducer;