import {call,put,takeEvery} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadMonthlyDetailsApi } from '../apis/expertMonthlyDetailsApi';
import { loadMonthlyDetailsError, loadMonthlyDetailsSuccess } from '../actions/ExpertMonthlyActions';
export function* onLoadMonthlyDetailsStartAsync (action){
        try {
            const { month } = action.payload;
            const {page} = action.payload;
            const response = yield call(loadMonthlyDetailsApi,month,page);
            if (response.status === 200) {
                yield put(loadMonthlyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadMonthlyDetailsError(error.response.data)); 
        }
}
export function* onLoadmonthlyDetails(){
    yield takeEvery(types.LOAD_MONTHLY_DETAILS_START,onLoadMonthlyDetailsStartAsync);
}

