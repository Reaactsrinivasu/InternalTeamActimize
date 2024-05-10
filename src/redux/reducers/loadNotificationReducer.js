


import * as types from '../actions/actionTypes';

const initialState = {
    createnotifications: {
        users: [],
        token: null,
        loading: false,
           },
};
const loadNotificationReducer = (state = initialState.createnotifications, action)=>{
    switch (action.type) {
            case types.LOAD_NOTIFICATIONS_DETAILS_START:        
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_NOTIFICATIONS_DETAILS_SUCCESS:         
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_NOTIFICATIONS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
          
            default:
            return state;
    }

}
export default loadNotificationReducer;