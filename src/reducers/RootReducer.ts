import { Reducer, Action } from "redux";
import StoreState from "../StoreState";
import typingReducer from "./TypingReducer";

export interface InitAction extends Action<'init'> {

}

export type StoreAction = InitAction;

const rootReducer: Reducer<StoreState, StoreAction> = (state, action) => {

    return {
        typingProps: typingReducer(state ? state.typingProps : undefined, action)
    };
};

export default rootReducer;