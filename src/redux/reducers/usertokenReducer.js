import * as types from '../actions/actionTypes';

const initialState = {
    login: {
        users: [],
        token: null,
        status: 'logged out',
        loading: false,
           },
};

const userTokenReducer = (state = initialState.login, action)=>{
    switch (action.type) {
            //Login exixting user 
            
        case types.USERTOKEN_USER_START:
            
            return {
                ...state,
                loading: true
            };
        case types.USERTOKEN_USER_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
            case types.USERTOKEN_USER_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            default:
            return state;
    }

}
export default userTokenReducer;