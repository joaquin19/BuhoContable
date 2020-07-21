import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { actionsReducers } from '../../reducers'

interface data {
	type: string;
	payload: any;
}

export function* ChangeScreen(data: data) {
	yield put({ type: actionsReducers.ADD_SCREEN, payload: data.payload.values });
	yield put(push(data.payload.path));
}
