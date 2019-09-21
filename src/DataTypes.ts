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
    idJob: Job['id'];
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
    idJob: Job['id'];
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

export type LinksEnum = 'website' | 'github' | 'npm' | 'linkedin' | 'stackoverflow';

export type Links<L extends LinksEnum = LinksEnum> = {
    [k in L]?: {
        url: string;
        iconPath?: string;
    };
};

export interface JobColors {
    mainBackground: string;
    secondaryBackground?: string;
    mainColor: string;
    secondaryColor?: string;
}

export type Job<T extends JobType = JobType> = {
    id: number;
    type: T;
    companyName: string;
    jobFunction: LangString;
    description: Markdown;
    tags: LangString[];
    logo: string;
    medias: Media[];
    startDate: Moment;
    endDate?: Moment;
    skills: Skills;
    colors: JobColors;
    links: Links;
    projects: Project['name'][];
};

export type ProjectType = 'personal' | 'professional';

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

export type ProjectOne<T extends ProjectType = ProjectType> = {
    name: string;
    description: Markdown;
    logo?: string;
    tags: LangString[];
    medias: Media[];
    startDate: Moment;
    state: ProjectState;
    skills: Skills;
    type: T;
    links: Links<'website' | 'github' | 'npm'>;
    jobs?: Job['id'];   //even personal, a project can be used in job
};

export type ProjectGroup<T extends ProjectType = ProjectType> = {
    name: string;
    description: Markdown;
    logo?: string;
    tags: LangString[];
    medias: Media[];
    startDate: Moment;
    state: ProjectState;
    type: T;
    group: ProjectOne[];
    links: Links<'website' | 'github' | 'npm'>;
    jobs?: Job['id'];
}

export type Project<T extends ProjectType = ProjectType> = ProjectOne<T> | ProjectGroup<T>;

export type School = {
    name: string;
    description: Markdown;
    logo: string;
    // startDate: Moment; // usefull ?
    endDate: Moment;
    degree: LangString;
    skills: Skills;
    links: Links<'website'>;
    job?: Job<'stage'>;
    projects: Project<'personal'>[];
};

export type Other = {
    createdDate: Moment;
    portfolioLinks: Links<'github'>;
};

export type Category = 'welcome' | 'whoiam' | 'jobs' | 'projects' | 'schools' | 'contact' | 'hummus';

export type Sample = {

    categories: Category[];

    user: User;

    skills: Skills;

    jobs: Job[];
    projects: Project[];
    schools: School[];

    links: Links;
    mails: string[];

    other: Other;
};