import {call,put,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { userTokenApi } from '../apis/userTokenApi';
import { userTokenSuccess,userTokenError} from '../actions/userTokenActions';
export function* onuserTokenStartAsync ({payload}){
        try {
            const result = yield call(userTokenApi,payload);
            if (result.status === 200) {
                yield put(userTokenSuccess(result.data));
            }
        } catch (error) {
            yield put(userTokenError(error));
        }
}
export function* onuserToken(){
    yield takeLatest(types.USERTOKEN_USER_START,onuserTokenStartAsync);
}