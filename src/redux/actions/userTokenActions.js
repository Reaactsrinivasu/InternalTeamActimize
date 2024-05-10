import * as types from './actionTypes';

export const userTokenStart = (deviceToken) => {
    return {
        type:types.USERTOKEN_USER_START,
        payload: {
            device_token: deviceToken
          }
  }};
export const userTokenSuccess =  () =>({
    type:types.USERTOKEN_USER_SUCCESS,
    
});
export const userTokenError = (error) =>({
    type:types.USERTOKEN_USER_ERROR,
    payload: error,
});

export default {
    userTokenStart
}
