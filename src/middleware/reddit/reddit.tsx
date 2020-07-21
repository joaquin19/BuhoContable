import { all, call, put, select } from 'redux-saga/effects'
import { actionsReducers } from '../../reducers';
import { GET } from '../../api'
import { toastr } from 'react-redux-toastr'

// function gets waves and campaigns
export function* getPost(data) {
    try {
        const [resp] = yield all([
            call(GET, { target: 'orders/2117155815564' }),
        ]);
        //validate get trainings correctly
        if (resp.success) {
            yield all([
                put({
                    type: actionsReducers.ADD_POST, payload: {
                        order: resp.order
                    }
                }),
            ])
        } else {
            toastr.error('Error', resp.message);
        }
    } catch (e) {
        //show alert error to client
        console.log(e);
        toastr.error('Error', 'Post: Server error.');
    }
}

//fuction send data for save waves
export function* savePost() {
    try {
        //recovery form data
        const { initial, values } = yield select(state => state.form.GenericForm);
        //run petition for api save training
        //show alert successful to client
        toastr.success('Success', 'Psost is saved');
        //run getWaves function and get refreshed records
        yield put({ type: actionsReducers.ADD_POSTS, payload: { ...initial, ...values } });
    } catch (e) {
        toastr.error('Error', 'Server error.');
    }
}

export function* payOrder(data) {
    try {
        //show alert successful to client
        toastr.success('Success', 'The order is done');
        //run getWaves function and get refreshed records
    } catch (e) {
        //show alert error to client
        toastr.error('Error', 'Server error.');
    }
}