import {call,put,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { userTokenApi } from '../apis/userTokenApi';
import { userTokenSuccess,userTokenError} from '../actions/userTokenActions';
import { readnotificationError, readnotificationSuccess } from '../actions/readNotificationsActions';
import { readNotificationApi } from '../apis/readNotificationsApi';

export function* onuserreadNotificationsStartAsync ({payload}){
        try {
            const result = yield call(readNotificationApi,payload);
            if (result.status === 200) {
                yield put(readnotificationSuccess(result.data));
            }
        } catch (error) {
            yield put(readnotificationError(error));
        }
}
export function* onreadnotification(){
    yield takeLatest(types.READ_NOTIFICATIONS_START,onuserreadNotificationsStartAsync);
}