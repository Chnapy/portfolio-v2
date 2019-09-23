import {Dispatch} from 'redux';
import {StoreAction} from "./StoreAction";

export abstract class Service<S> {

    protected readonly dispatch: Dispatch<StoreAction>;

    constructor(dispatch: Dispatch<StoreAction>) {
        this.dispatch = dispatch;
    }

    abstract getInitialState(): Readonly<S>;

    reduce(state: Readonly<S> | undefined, action: StoreAction): S {
        return this.onReduce(state || this.getInitialState(), action);
    }

    abstract onReduce(state: Readonly<S>, action: StoreAction): Readonly<S>;

}
