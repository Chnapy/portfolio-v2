
type Lang = 'fr' | 'en';

type LangString = {
    [k in Lang]: string;
};

type Markdown = LangString;

type Media = {
    type: 'image' | 'video' | 'iframe';
    url: string;
};

type JobType = 'salaryman' | 'freelance' | 'stage';

type UserThumb = {
    iconPath: string;
    sub: LangString;
};

type UserStatus = {
    type: JobType;
    idJob: Job['id'];
} | {
    type: 'none';
};

type User = {
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

type HardSkill = {
    name: string;
    iconPath: string;
    sortPriority: number;
};

type Skills = {
    hard: HardSkill[];
};

type LinksEnum = 'website' | 'github' | 'npm' | 'linkedin' | 'stackoverflow';

type Links<L extends LinksEnum = LinksEnum> = {
    [k in L]?: {
        url: string;
        iconPath?: string;
    };
};

type Job<T extends JobType = JobType> = {
    id: number;
    type: T;
    company: string;
    function: LangString;
    description: Markdown;
    logo: string;
    medias: Media[];
    startDate: Date;
    endDate?: Date;
    skills: Skills;
    mainColor: string;
    links: Links;
    projects: Project['name'][];
};

type ProjectType = 'personal' | 'professional';

type ProjectStateWIP = {
    type: 'wip';
};

type ProjectStateFinished = {
    type: 'finished';
    endDate: Date;
};

type ProjectStateStandby = {
    type: 'standby';
    breakDate: Date;
};

type ProjectState = ProjectStateWIP | ProjectStateFinished | ProjectStateStandby;

type Project<T extends ProjectType = ProjectType> = {
    name: string;
    description: Markdown;
    logo?: string;
    medias: Media[];
    startDate: Date;
    state: ProjectState;
    skills: Skills;
    type: T;
    links: Links<'website' | 'github' | 'npm'>;
    jobs?: Job['id'];   //even personal, a project can be used in job
};

type School = {
    name: string;
    description: Markdown;
    logo: string;
    // startDate: Date; // usefull ?
    endDate: Date;
    degree: LangString;
    skills: Skills;
    links: Links<'website'>;
    job?: Job<'stage'>;
    projects: Project<'personal'>[];
};

type Other = {
    createdDate: Date;
    portfolioLinks: Links<'github'>;
};

type Category = 'welcome' | 'skills' | 'jobs' | 'projects' | 'schools' | 'contact';

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