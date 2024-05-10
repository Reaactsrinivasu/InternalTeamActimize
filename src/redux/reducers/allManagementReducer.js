import * as types from '../actions/actionTypes';
const initialState = {
    loadAllManagementDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const allManagementReducer = (state = initialState.loadAllManagementDetails, action)=>{
    switch (action.type) {
            case types.LOAD_ALL_MANGEMENT_START:
                return {
                    ...state,
                    loading: true,
                };
    
            case types.LOAD_ALL_MANGEMENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                };
    
            case types.LOAD_ALL_MANGEMENT_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
                default:
            return state;
    }
}
export default allManagementReducer;