import {call,put,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { allowNotificationError, allowNotificationSuccess } from '../actions/allowNotificationsActions';
import { allowNotificationApi } from '../apis/allowNotificationsApi';

export function* onallowNotificationStartAsync ({payload}){
        try {
            const result = yield call(allowNotificationApi,payload);
            if (result.status === 200) {
                yield put(allowNotificationSuccess(result.data));
            }
        } catch (error) {
            yield put(allowNotificationError(error));
        }
}
export function* onallowNotification(){
    yield takeLatest(types.ALLOW_NOTIFICATIONS_USER_START,onallowNotificationStartAsync);
}