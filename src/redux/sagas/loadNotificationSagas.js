import {call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadNotificationsDetailsError, loadNotificationsDetailsSuccess } from '../actions/loadNotificationsActions';
import { loadNotificationsDetailsApi } from '../apis/loadNotificationsApi';



export function* onLoadNotificationsDetailsStartAsync (){
    try {
        const response = yield call(loadNotificationsDetailsApi);
        if (response.status === 200) {
            yield put(loadNotificationsDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadNotificationsDetailsError(error.response.data));
        
    }
}

export function* onLoadNotificationsDetails(){
yield takeEvery(types.LOAD_NOTIFICATIONS_DETAILS_START,onLoadNotificationsDetailsStartAsync);
}
    
 
