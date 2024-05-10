import * as types from '../actions/actionTypes';

const initialState = {
    loadAllUsersDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const allowNotificationReducer = (state = initialState.loadAllUsersDetails, action)=>{
    switch (action.type) {
        case types.ALLOW_NOTIFICATIONS_USER_START:
            return {
                ...state,
                loading: true
            };
        case types.ALLOW_NOTIFICATIONS_USER_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
            case types.ALLOW_NOTIFICATIONS_USER_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            default:
            return state;
    }
}
export default allowNotificationReducer;