import { Action, Dispatch } from "redux";
import StoreState from "../StoreState";
import MyReducer from './MyReducer';
import TiledReducer, { TiledAction } from './TiledReducer';
import TypingReducer from './TypingReducer';

export type InitAction = Action<'init'>;

export type StoreAction = InitAction | TiledAction;

export default class RootReducer extends MyReducer<StoreState> {

    private readonly typingReducer: TypingReducer;
    private readonly tiledReducer: TiledReducer;

    constructor(dispatch: Dispatch<StoreAction>) {
        super(dispatch);
        this.typingReducer = new TypingReducer(dispatch);
        this.tiledReducer = new TiledReducer(dispatch);
    }

    getInitialState = () => ({
        typingProps: this.typingReducer.getInitialState(),
        tiledProps: this.tiledReducer.getInitialState()
    });

    onReduce = (state: Readonly<StoreState>, action: StoreAction): StoreState => {
        return {
            typingProps: this.typingReducer.reduce(state.typingProps, action),
            tiledProps: this.tiledReducer.reduce(state.tiledProps, action)
        };
    };

}
