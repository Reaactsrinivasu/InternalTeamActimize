import * as types from './actionTypes';
export const loadAllManagementStart = (pageno) =>({
    type:types.LOAD_ALL_MANGEMENT_START,
    payload:{page : pageno },
});
export const loadAllManagementSuccess = (data) => {
    const action = {
      type: types.LOAD_ALL_MANGEMENT_SUCCESS,
      payload: data,
    };
    return action;
  };
export const loadAllManagementError = (error) =>({
    type:types.LOAD_ALL_MANGEMENT_ERROR,
    payload: error,
});
export default {   
    loadAllManagementStart,
}
