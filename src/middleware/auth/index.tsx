import { takeLatest, fork } from 'redux-saga/effects';
import { actionsReducers } from '../../reducers'

import * as auth from './login'

function* authModule() {
	yield takeLatest(actionsReducers.LOGIN, auth.getUser);
	yield takeLatest(actionsReducers.LOGOUT, auth.logout);
	yield takeLatest(actionsReducers.RENEW, auth.renew);
	yield takeLatest(actionsReducers.VALIDATE, auth.validate);
	yield takeLatest(actionsReducers.CHANGE_PASSWORD, auth.changePassword);
	yield takeLatest(actionsReducers.SEND_PASSWORD, auth.sendPassword);
}

export default function* main() {
	yield fork(authModule);
}