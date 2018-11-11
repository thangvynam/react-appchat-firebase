import { CLEAR_MESSAGE } from '../contsants/actionType'
const sendInitialState = {
    message: ''
}
const sendReducer = (state = sendInitialState, action) => {
    switch (action.type) {
        case CLEAR_MESSAGE:
            return { ...state, message: action.message }
        default:
            return state
    }
}
export default sendReducer;