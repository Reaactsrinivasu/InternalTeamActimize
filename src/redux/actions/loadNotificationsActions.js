
import * as types from './actionTypes';
export const loadNotificationsDetailsStart = () =>({
    type:types.LOAD_NOTIFICATIONS_DETAILS_START,
});
export const loadNotificationsDetailsSuccess = (data) =>(
    {
    type:types.LOAD_NOTIFICATIONS_DETAILS_SUCCESS,
    payload: data,
});
export const loadNotificationsDetailsError = (error) =>({
    type:types.LOAD_NOTIFICATIONS_DETAILS_ERROR,
    payload: error,
});


export default {
    loadNotificationsDetailsStart,
  
}
