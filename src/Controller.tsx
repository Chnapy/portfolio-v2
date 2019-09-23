import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, createStore, Dispatch, Reducer, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import RootService from './core/RootService';
import StoreState from './core/StoreState';
import {createLogger} from 'redux-logger';
import {StoreAction} from "./core/StoreAction";

export default class Controller {

    private readonly store: Store<StoreState, StoreAction>;

    constructor() {

        const dispatch: Dispatch<StoreAction> = action => this.store.dispatch(action);

        const rootReducer = new RootService(dispatch);

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
    }

    renderToDOM() {
        ReactDOM.render((
            <Provider store={this.store}>
                <App/>
            </Provider>
        ), document.getElementById('root'));
    }
}