import * as types from './actionTypes';
export const readnotificationStart = (id) => {
    return {
        type:types.READ_NOTIFICATIONS_START,
        payload: {
            notification_id: id
          }
  }};
export const readnotificationSuccess =  () =>({
    type:types.READ_NOTIFICATIONS_SUCCESS,
    
});
export const readnotificationError = (error) =>({
    type:types.READ_NOTIFICATIONS_ERROR,
    payload: error,
});

export default {
    readnotificationStart
}
