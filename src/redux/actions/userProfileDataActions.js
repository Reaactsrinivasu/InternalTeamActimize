import * as types from './actionTypes';
export const loadUserProfileDetailsStart = () =>({
    type:types.LOAD_USER_PROFILE_DETAILS_START,
});
//loading user profile  details
export const loadUserProfileDetailsSuccess = (data) =>(
    {
    type:types.LOAD_USER_PROFILE_DETAILS_SUCCESS,
    payload: data,
    });
export const loadUserProfileDetailsError = (error) =>({
    type:types.LOAD_USER_PROFILE_DETAILS_ERROR,
    payload: error,
});
