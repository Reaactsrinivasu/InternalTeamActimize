import * as types from '../actions/actionTypes';

const initialState = {
    login: {
        users: [],
        token: null,
        status: 'logged out',
        loading: false,
           },
};

const readnotificationsReducer = (state = initialState.login, action)=>{
    switch (action.type) {
        case types.READ_NOTIFICATIONS_START:
            
            return {
                ...state,
                loading: true
            };
        case types.READ_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
            case types.READ_NOTIFICATIONS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            default:
            return state;
    }

}
export default readnotificationsReducer;