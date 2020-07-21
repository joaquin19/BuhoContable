import { takeLatest, fork } from 'redux-saga/effects';
import { actionsReducers } from '../../reducers'

import * as training from './reddit'

function* PostModule() {
	yield takeLatest(actionsReducers.GET_POST, training.getPost);
	yield takeLatest(actionsReducers.CREATE_POSTS, training.savePost);
}

export default function* main() {
	yield fork(PostModule);
}