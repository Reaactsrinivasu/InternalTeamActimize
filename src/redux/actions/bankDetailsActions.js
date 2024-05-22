import * as types from './actionTypes';
//adding bank details
export const createBankDetailsStart =  (users, id) =>(
    {
    type:types.CREATE_BANK_DETAILS_START,
    payload: {users, id},
});
export const createBankDetailsSuccess =  () =>({
    type:types.CREATE_BANK_DETAILS_SUCCESS,
});
export const createBankDetailsError = (error) =>({
    type:types.CREATE_BANK_DETAILS_ERROR,
    payload: error,
});
//loading bank details
export const loadBankDetailsStart = (id) =>(
    {
    type: types.LOAD_BANK_DETAILS_START,
    id: id,
});
export const loadBankDetailsSuccess = (data) =>({
    type:types.LOAD_BANK_DETAILS_SUCCESS,
    payload: data, 
});
export const loadBankDetailsError = (error) =>({
    type:types.LOAD_BANK_DETAILS_ERROR,
    payload: error,
});
export default {
    createBankDetailsStart,
    loadBankDetailsStart,
}
