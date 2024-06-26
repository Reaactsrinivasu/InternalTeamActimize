import {call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import { 
    createBankDetailsSuccess,
    createBankDetailsError,
    loadBankDetailsSuccess, 
    loadBankDetailsError,
} from '../actions/bankDetailsActions';
import * as types from '../actions/actionTypes';
import {
    createBankDetailsApi,
    loadBankDetailsApi,
} from '../apis/bankDetailsApi';
//adding data
export function* onCreateBankDetailsStartAsync({payload}){
        try {
            const response = yield call(createBankDetailsApi,payload);
            if (response.status === 200) {
                yield put(createBankDetailsSuccess(response));
            }
        } catch (error) {
                 yield put(createBankDetailsError(error.response));
            
        }
}
export function* onCreateBankDetails(){
    yield takeLatest(types.CREATE_BANK_DETAILS_START,onCreateBankDetailsStartAsync);
}

//getting data
export function* onLoadBankDetailsStartAsync(id){
    console.log('this is id in saga----->', id, typeof id)
        try {
            const response = yield call(loadBankDetailsApi,id);
            if (response.status === 200) {
                yield put(loadBankDetailsSuccess(response));
                console.log('this is resoponse in saga--->', response)
            }
        } catch (error) {
            yield put(loadBankDetailsError(error.response.data));
            
        }
}
export function* onLoadBankDetails(){
    yield takeEvery(types.LOAD_BANK_DETAILS_START,onLoadBankDetailsStartAsync);
}



    
 

