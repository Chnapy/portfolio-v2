import {Moment} from 'moment';

export type Lang = 'fr' | 'en';

export type LangString = {
    [k in Lang]: string;
};

export type Markdown = LangString;

export type Media = {
    type: 'image' | 'video' | 'iframe';
    url: string;
};

export type JobType = 'salaryman' | 'freelance' | 'stage';

export type UserThumb = {
    iconPath: string;
    sub: LangString;
};

export type UserStatus = {
    type: JobType;
    idJob: Job<any>['id'];
} | {
    type: 'none';
};

export type User = {
    lastname: string;
    firstname: string;
    address: string;
    description: Markdown;
    avatars: string[];
    whereIAmGood: UserThumb[];
    whatILike: UserThumb[];
    status: UserStatus;
    idJob: Job<any>['id'];
};

export type Icon = {
    type: 'className';
    className: string;
} | {
    type: 'img';
    iconPath: string;
};

export type HardSkill = {
    id: string;
    name: string;
    color: string;
    icon: Icon;
    level: number;
    // sortPriority: number;
};

export type Skills = {
    hard: HardSkill[];
};

export type SkillsID = {
    hard: HardSkill['id'][];
};

export type LinksEnum = 'website' | 'github' | 'npm' | 'linkedin' | 'stackoverflow';

export type Links<L extends LinksEnum = LinksEnum> = {
    [k in L]?: {
        url: string;
        iconPath?: string;
    };
};

export interface PaneColors {
    mainBackground: string;
    secondaryBackground?: string;
    mainColor: string;
    secondaryColor?: string;
}

export interface BuildingImg {
    src: string;
    pos: {
        x: number;
        y: number;
    };
}

export type Job<FromServer extends boolean, T extends JobType = JobType> = {
    type: 'job';
    id: number;
    jobType: T;
    name: string;
    capacity: LangString;
    description: Markdown;
    tags: LangString[];
    logo: string;
    medias: Media[];
    startDate: Moment;
    endDate?: Moment;
    skills: FromServer extends true ? SkillsID : Skills;
    colors: PaneColors;
    buildings: BuildingImg[];
    links: Links;
    projects: (FromServer extends true ? Project<any>['id'] : Project<false>)[];
};

export type ProjectContext = 'personal' | 'professional';

export type ProjectStateWIP = {
    type: 'wip';
};

export type ProjectStateFinished = {
    type: 'finished';
    endDate: Moment;
};

export type ProjectStateStandby = {
    type: 'standby';
    breakDate: Moment;
};

export type ProjectState = ProjectStateWIP | ProjectStateFinished | ProjectStateStandby;

export type ProjectOne<FromServer extends boolean, C extends ProjectContext = ProjectContext> = {
    type: 'project-one';
    id: number;
    name: string;
    description: Markdown;
    logo?: string;
    tags: LangString[];
    medias: Media[];
    startDate: Moment;
    state: ProjectState;
    skills: FromServer extends true ? SkillsID : Skills;
    context: C;
    links: Links<'website' | 'github' | 'npm'>;
    job?: FromServer extends true ? Job<any>['id'] : Job<false>;   //even personal, a project can be used in job
};

export type ProjectGroup<FromServer extends boolean, C extends ProjectContext = ProjectContext> = {
    type: 'project-group';
    id: number;
    name: string;
    description: Markdown;
    logo?: string;
    tags: LangString[];
    medias: Media[];
    startDate: Moment;
    state: ProjectState;
    context: C;
    group: ProjectOne<FromServer>[];
    links: Links<'website' | 'github' | 'npm'>;
    job?: FromServer extends true ? Job<any>['id'] : Job<false>;
}

export type Project<FromServer extends boolean, T extends ProjectContext = ProjectContext> =
    ProjectOne<FromServer, T>
    | ProjectGroup<FromServer, T>;

export type School<FromServer extends boolean> = {
    type: 'school';
    id: number;
    name: string;
    capacity: LangString;
    description: Markdown;
    logo: string;
    endDate: Moment;
    skills: FromServer extends true ? SkillsID : Skills;
    colors: PaneColors;
    buildings: BuildingImg[];
    links: Links<'website'>;
    job?: FromServer extends true ? Job<any>['id'] : Job<false>;
    projects: Project<FromServer, 'personal'>['id'][];
};

export type Other = {
    createdDate: Moment;
    portfolioLinks: Links<'github'>;
};

export type Category = 'welcome' | 'whoiam' | 'jobs' | 'projects' | 'schools' | 'contact' | 'hummus';

export type Sample<FromServer extends boolean> = {

    categories: Category[];

    user: User;

    skills: Skills;

    jobs: Job<FromServer>[];
    projects: Project<FromServer>[];
    schools: School<FromServer>[];

    links: Links;
    mails: string[];

    other: Other;
};