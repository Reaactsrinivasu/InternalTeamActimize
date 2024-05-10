import * as types from './actionTypes';
export const loadMonthlyAttendenceDetailsStart = (usermonth,pageno) => {
  return {
    type:types.LOAD_MONTHLYATTENDENCELIST_DETAILS_START,
    payload:{month : usermonth,page : pageno },
}};


export const loadMonthlyAttendenceDetailsSuccess = (data) =>(
    {
    type:types.LOAD_MONTHLYATTENDENCELIST_DETAILS_SUCCESS,
    payload: data,
});
export const loadMonthlyAttendenceDetailsError = (error) =>({
    type:types.LOAD_MONTHLYATTENDENCELIST_DETAILS_ERROR,
    payload: error,
});
export default {
    loadMonthlyAttendenceDetailsStart, 
}