import { StoreAction } from './RootReducer';
import { Dispatch } from 'redux';

abstract class MyReducer<S> {

    protected readonly dispatch: Dispatch<StoreAction>;

    constructor(dispatch: Dispatch<StoreAction>) {
        this.dispatch = dispatch;
    }

    abstract getInitialState(): Readonly<S>;

    reduce(state: Readonly<S> | undefined, action: StoreAction): S {
        return this.onReduce(state || this.getInitialState(), action);
    }

    abstract onReduce(state: Readonly<S>, action: StoreAction): S;

}

export default MyReducer;