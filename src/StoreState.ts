import { CodeTypingProps } from "./home/code/CodeTyping";
import { TiledProps } from './home/tiled/Tiled';
import { TiledLayerName } from "./reducers/TiledReducer";

export default interface StoreState {

    typingProps: CodeTypingProps;

    tiledProps: TiledProps<TiledLayerName>;

}