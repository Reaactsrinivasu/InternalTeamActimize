import * as types from './actionTypes';
export const allowNotificationStart = (allownotification) => {
    return {
        type:types.ALLOW_NOTIFICATIONS_USER_START,
        payload: {
            allow_notification: allownotification
          }
  }};
export const allowNotificationSuccess =  () =>({
    type:types.ALLOW_NOTIFICATIONS_USER_SUCCESS,
    
});
export const allowNotificationError = (error) =>({
    type:types.ALLOW_NOTIFICATIONS_USER_ERROR,
    payload: error,
});

export default {
    allowNotificationStart
}