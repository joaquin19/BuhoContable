import { call, put, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toastr } from 'react-redux-toastr'

import { GET, POST } from '../../api'
import { actionsReducers } from '../../reducers'


export function* getUser(data) {
    var params = {
        userName: data.payload.email,
        password: data.payload.password,
        rememberMe: data.payload.rememberme
    };
    const response = yield call(POST, { target: 'token', body: params });
    if (response.result === "OK") {
        yield put({ type: actionsReducers.LOGIN_SUCCESS, payload: response.record });
        yield put(push('/'));
    }
    else if (response.result === "Error" && response.message == "UsePasswordDefault") {
        yield put({ type: actionsReducers.USE_PASSWORD_DEFAULT });
    } else {
        toastr.error('Error', 'Wrong Credentials');
        yield put({ type: actionsReducers.LOGIN_ERROR });
    }
}

export function* logout() {
    yield put({ type: actionsReducers.LOGOUT_SUCCESS });
    yield put(push('/login'));
}

export function* validate() {
    const location = yield select(state => state.router.location.pathname)
    const token = yield select(state => state.auth.token);
    if (token === '') {
        yield put({ type: actionsReducers.LOGOUT_SUCCESS });
        yield put(push('/login'));
    } else if (location === '/login' && token !== '') {
        yield put(push('/'));
    }
}

export function* renew() {
    const location = yield select(state => state.router.location.pathname)
    const token = yield select(state => state.auth.token);
    if (token !== ''){
        const response = yield call(GET, { target: 'token/renew' });
        if (response.result === "OK") {
            yield put({ type: actionsReducers.RENEW_SUCCESS, payload: response.record });
        } else {
            yield put({ type: actionsReducers.LOGOUT_SUCCESS });
            toastr.error('Error', response.message);
            yield put(push('/login'));
        }
    }
}

export function* changePassword(data) {
    const response = yield call(POST, { target: 'user/changepassword', body: data.payload });
    if (response.result === "OK") {
        toastr.success('Success', 'The password was updated successfully');
        yield put({ type: actionsReducers.RESET_VIEW_LOGIN });
    }
    else {
        toastr.error('Error', response.message);
        yield put({ type: actionsReducers.LOGIN_ERROR });
    }
}

export function* sendPassword(data) {
    const response = yield call(POST, { target: 'user/forgotpassword', body: data.payload });
    if (response.result === "OK") {
        toastr.success('Success', 'The password was sended you email successfully');
        yield put({ type: actionsReducers.RESET_VIEW_LOGIN });
    }
    else {
        toastr.error('Error', response.message);
        yield put({ type: actionsReducers.LOGIN_ERROR });
    }
}