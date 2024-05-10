import { call, put, take, delay,takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createHoursEntryDetailsApi,loadHoursEntryDetailsApi,updateHoursEntryApi} from  '../apis/hoursEntryApi';
import {createHoursEntryDetailsSuccess,createHoursEntryDetailsError,loadHoursEntryDetailsSuccess,
    loadHoursEntryDetailsError,updateHoursEntryDetailsSuccess,updateHoursEntryDetailsError} from '../actions/hoursEntryActions';
//adding data
export function* onCreateHoursEntryDetailsStartAsync({ payload }) {
    try {
      
        const response = yield call(createHoursEntryDetailsApi, payload);
        if (response.status === 200) {
            yield put(createHoursEntryDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(createHoursEntryDetailsError(error.response.data));

    }
}
export function* onCreateHoursEntryDetails() {
    yield takeLatest(types.CREATE_HOURSENTRY_DETAILS_START, onCreateHoursEntryDetailsStartAsync);
}

export function* onLoadHoursEntryDetailsStartAsync (){
    try {
        const response = yield call(loadHoursEntryDetailsApi);
        if (response.status === 200) {
            // yield delay(500);
            yield put(loadHoursEntryDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadHoursEntryDetailsError(error.response.data));
    }
}
export function* onLoadHoursEntryDetails(){
    yield takeEvery(types.LOAD_HOURSENTRY_DETAILS_START,onLoadHoursEntryDetailsStartAsync);
}

export function* onUpdateHoursEntryDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = { weekly_status: payload.payload[0].weekly_status }; 
try {
    const response = yield call(updateHoursEntryApi,id,payloadData);
   
    if (response.status === 200) {
        yield put(updateHoursEntryDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateHoursEntryDetailsError(error.response.data)); 
}
}

export function* onUpdateHoursEntryDetails(){
    yield takeLatest(types.UPDATE_HOURSENTRY_DETAILS_START,onUpdateHoursEntryDetailsStartAsync);
}