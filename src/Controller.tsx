import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Store, createStore, Dispatch, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer, { StoreAction } from './reducers/RootReducer';
import StoreState from './StoreState';
import RootReducer from './reducers/RootReducer';

export default class Controller {

    private readonly store: Store<StoreState, StoreAction>;

    constructor() {

        const dispatch: Dispatch<StoreAction> = action => this.store.dispatch(action);

        const rootReducer = new RootReducer(dispatch);

        const storeReducer: Reducer<StoreState, StoreAction> = (s, a) => rootReducer.reduce(s, a);

        this.store = createStore(
            storeReducer,
            composeWithDevTools()
        );
        this.store.dispatch({
            type: 'init'
        });
    }

    renderToDOM() {
        ReactDOM.render((
            <Provider store={this.store}>
                <App />
            </Provider>
        ), document.getElementById('root'));
    }
}