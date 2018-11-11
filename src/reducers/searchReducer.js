import {SEARCH_USER} from '../contsants/actionType'

const searchInitialState = {
    items:[]
}
const searchReducer = (state = searchInitialState, action) => {
    switch (action.type) {
        case SEARCH_USER:
            return {...state,items:action.updatedList};
        default:
            return state
    }
}
export default searchReducer;