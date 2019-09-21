import {Dispatch} from "redux";
import StoreState from "./StoreState";
import {Service} from './Service';
import {TiledService} from '../home/service/TiledService';
import {TypingService} from '../home/service/TypingService';
import {JobService} from "../jobsdegrees/service/JobService";
import {SkillService} from "../whoiam/service/SkillService";
import {StoreAction} from "./StoreAction";

export default class RootService extends Service<StoreState> {

    private readonly typingService: TypingService;
    private readonly tiledService: TiledService;
    private readonly jobService: JobService;
    private readonly skillService: SkillService;

    constructor(dispatch: Dispatch<StoreAction>) {
        super(dispatch);
        this.typingService = new TypingService(dispatch);
        this.tiledService = new TiledService(dispatch);
        this.jobService = new JobService(dispatch);
        this.skillService = new SkillService(dispatch);
    }

    getInitialState = (): StoreState => ({
        typingProps: this.typingService.getInitialState(),
        tiledProps: this.tiledService.getInitialState(),
        jobs: this.jobService.getInitialState(),
        skills: this.skillService.getInitialState()
    });

    onReduce = (state: Readonly<StoreState>, action: StoreAction): StoreState => {
        return {
            typingProps: this.typingService.reduce(state.typingProps, action),
            tiledProps: this.tiledService.reduce(state.tiledProps, action),
            jobs: this.jobService.reduce(state.jobs, action),
            skills: this.skillService.reduce(state.skills, action)
        };
    };

}
