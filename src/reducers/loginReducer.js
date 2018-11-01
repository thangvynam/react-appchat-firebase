import {USER_IS_LOGIN} from '../contsants/actionType'
const loginInitialState = {
    email :'' ,
    password : ''
}
const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case USER_IS_LOGIN:
            return {...state,email:action.email,password:action.password}
        default:
            return state
    }
}
export default loginReducer;
