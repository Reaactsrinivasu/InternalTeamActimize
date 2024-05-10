import * as types from '../actions/actionTypes';
const initialState = {
    createUserProfileDetails: {
        users: {},
        token: null,
        loading: false,
           },
};

const getUserProfileDetailReducer = (state = initialState.createUserProfileDetails, action)=>{
    switch (action.type) {
            case types.LOAD_USER_PROFILE_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        
        case types.LOAD_USER_PROFILE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
                data:action.payload
            };
            case types.LOAD_USER_PROFILE_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            default:
            return state;
    }

}
export default getUserProfileDetailReducer;