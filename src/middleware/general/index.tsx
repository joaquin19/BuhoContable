import { takeLatest, fork } from 'redux-saga/effects';
import { actionsReducers } from '../../reducers'

import * as general from './general'


function* GeneralConfig() {
	yield takeLatest(actionsReducers.CHANGE_SCREEN, general.ChangeScreen);
}

export default function* main() {
	yield fork(GeneralConfig);
}