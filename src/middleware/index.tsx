import { fork } from 'redux-saga/effects'

import general from './general'
import training from './reddit'
import auth from './auth';

export default function* Darwin() {
    yield fork(general);
    yield fork(auth);
    yield fork(training);
}