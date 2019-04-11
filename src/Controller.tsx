import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Store, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer, { StoreAction } from './reducers/RootReducer';
import StoreState from './StoreState';

export default class Controller {

    private readonly store: Store<StoreState, StoreAction>;

    constructor() {
        this.store = createStore(rootReducer, composeWithDevTools());
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