import * as types from '../actions/actionTypes';

const initialState = {
    createWeeklySelectDetails: {
        users: [],
        token: null,
        data: [],
        loading: false,
           },
};
const WeeklySelectDetailsReducer = (state = initialState.createWeeklySelectDetails, action)=>{
    switch (action.type) {                
            case types.LOAD_WEEKLYSELECT_DETAILS_START:         
                  return {
                      ...state,
                      loading: true
                  };
              
              case types.LOAD_WEEKLYSELECT_DETAILS_SUCCESS:         
                  return {
                      ...state,
                      loading: false ,
                      data:action.payload
                      };
              case types.LOAD_WEEKLYSELECT_DETAILS_ERROR:
                  return {
                      ...state,
                      loading: false ,
                      error:action.payload
                      }; 
            default:
            return state;
    }
}
export default WeeklySelectDetailsReducer