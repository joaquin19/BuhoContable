import { persistStore, persistCombineReducers } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { connectRouter,routerMiddleware } from 'connected-react-router'

import startSagas from './middleware'
import Reducers from './reducers'

//init Persist store
const rootReducer = (history) => persistCombineReducers({
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
}, {
    ...Reducers,
    router: connectRouter(history),
});

//create middleware saga
const SagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory()

//create store
const Store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), SagaMiddleware)),
);
//loggerMiddleware
const persistor = persistStore(Store);

SagaMiddleware.run(startSagas);

const getPersistor = () => persistor;
const getStore = () => Store;
const getState = () => Store.getState();
const getHistory = () => history;

export {
    getStore,
    getState,
    getPersistor,
    getHistory
}