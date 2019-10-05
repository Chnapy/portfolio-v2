import {Dispatch} from "redux";
import StoreState from "./StoreState";
import {Service} from './Service';
import {TiledService} from '../home/service/TiledService';
import {TypingService} from '../home/service/TypingService';
import {JobService} from "../jobsSchools/service/JobService";
import {SkillService} from "../whoiam/service/SkillService";
import {StoreAction} from "./StoreAction";
import {SchoolService} from "../jobsSchools/service/SchoolService";
import {ProjectsService} from "../projects/ProjectsService";

export default class RootService extends Service<StoreState> {

    private readonly typingService: TypingService;
    private readonly tiledService: TiledService;
    private readonly jobService: JobService;
    private readonly skillService: SkillService;
    private readonly schoolService: SchoolService;
    private readonly projectsService: ProjectsService;

    constructor(dispatch: Dispatch<StoreAction>) {
        super(dispatch);
        this.typingService = new TypingService(dispatch);
        this.tiledService = new TiledService(dispatch);
        this.jobService = new JobService(dispatch);
        this.skillService = new SkillService(dispatch);
        this.schoolService = new SchoolService(dispatch);
        this.projectsService = new ProjectsService(dispatch);
    }

    getInitialState = (): StoreState => ({
        typingProps: this.typingService.getInitialState(),
        tiledProps: this.tiledService.getInitialState(),
        jobs: this.jobService.getInitialState(),
        skills: this.skillService.getInitialState(),
        schools: this.schoolService.getInitialState(),
        projects: this.projectsService.getInitialState()
    });

    onReduce = (state: Readonly<StoreState>, action: StoreAction): StoreState => {
        return {
            typingProps: this.typingService.reduce(state.typingProps, action),
            tiledProps: this.tiledService.reduce(state.tiledProps, action),
            jobs: this.jobService.reduce(state.jobs, action),
            skills: this.skillService.reduce(state.skills, action),
            schools: this.schoolService.reduce(state.schools, action),
            projects: this.projectsService.reduce(state.projects, action)
        };
    };

}
