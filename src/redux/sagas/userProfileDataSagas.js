import {call,put,delay,takeEvery} from 'redux-saga/effects';
import { 
    loadUserProfileDetailsSuccess,
    loadUserProfileDetailsError,
} from '../actions/userProfileDataActions';
import * as types from '../actions/actionTypes';
import { getUserProfileData} from '../apis/userProfileDataApi';

export function* onLoadUserProfileDataStartAsync (){
    try {
        const response = yield call(getUserProfileData);
        if (response.status === 200) {
            yield delay(500);
            yield put(loadUserProfileDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadUserProfileDetailsError(error.response.data));
    }
}
export function* onLoadUserProfileData(){
    yield takeEvery(types.LOAD_USER_PROFILE_DETAILS_START,onLoadUserProfileDataStartAsync);
}


    
 

