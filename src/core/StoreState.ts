import {CodeTypingProps} from "../home/code/CodeTyping";
import {TiledProps} from '../home/tiled/Tiled';
import {TiledLayerName} from "../home/service/TiledService";
import {Job, School, Skills} from "../DataTypes";

export default interface StoreState {

    typingProps: CodeTypingProps;

    tiledProps: TiledProps<TiledLayerName>;

    skills: Skills;

    jobs: Job[];

    schools: School[];

}