import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Store, createStore, Dispatch, Reducer, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import rootReducer, {StoreAction} from './reducers/RootReducer';
import StoreState from './StoreState';
import RootReducer from './reducers/RootReducer';
import {createLogger} from 'redux-logger';

export default class Controller {

    private readonly store: Store<StoreState, StoreAction>;

    constructor() {

        const dispatch: Dispatch<StoreAction> = action => this.store.dispatch(action);

        const rootReducer = new RootReducer(dispatch);

        const storeReducer: Reducer<StoreState, StoreAction> = (s, a) => rootReducer.reduce(s, a);

        const logger = createLogger({
            timestamp: true,
            duration: true,
            collapsed: true
        });

        this.store = createStore(
            storeReducer,
            composeWithDevTools(
                applyMiddleware(
                    logger
                )
            )
        );
        this.store.dispatch({
            type: 'init'
        });
    }

    renderToDOM() {
        ReactDOM.render((
            <Provider store={this.store}>
                <App/>
            </Provider>
        ), document.getElementById('root'));
    }
}