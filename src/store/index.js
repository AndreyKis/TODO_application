import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, compose, createStore} from 'redux';

import saga from './sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

/**
 *
 * @param rootSaga
 */
function makeRootSaga(rootSaga) {
    return function* mainSaga(store, ...args) {
        yield rootSaga(store, ...args);
    };
}

/**
 *
 */
export default function configureStore() {
    let middleware = [thunk, sagaMiddleware];

    const windowIsDefined = typeof window === 'undefined' ? null : window;
    const devToolsExtension = windowIsDefined && windowIsDefined.devToolsExtension;

    const createStoreWithMiddleware = compose(
        applyMiddleware(...middleware),
        devToolsExtension ? devToolsExtension() : (f) => f
    )(createStore);

    const store = createStoreWithMiddleware(rootReducer);
    sagaMiddleware.run(makeRootSaga(saga), store, null);

    return store;
}