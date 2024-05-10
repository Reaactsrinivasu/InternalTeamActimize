import {call,put,takeEvery} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadAllUsersApi } from '../apis/allUsersApi';
import { loadAllUsersError, loadAllUsersSuccess } from '../actions/allUsersActions';
import { loadAllmanagementApi } from '../apis/allManagementApi';
import { loadAllManagementError, loadAllManagementSuccess } from '../actions/allManagementActions';

//getting data
export function* onLoadAllManagementStartAsync (){
        try {
            const response = yield call(loadAllmanagementApi);
            if (response.status === 200) {
                yield put(loadAllManagementSuccess(response.data));
            }
        } catch (error) {
            yield put(loadAllManagementError(error.response.data)); 
        }
}
export function* onLoadAllManagementDetails(){
    yield takeEvery(types.LOAD_ALL_MANGEMENT_START,onLoadAllManagementStartAsync);
}
