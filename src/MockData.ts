import {Data, Job, Project, ProjectGroup, ProjectOne, School} from "./DataTypes";
import {MOCK_SKILLS} from "./whoiam/service/SkillService";
import {MOCK_JOBS} from "./jobsSchools/service/JobService";
import {MOCK_SCHOOLS} from "./jobsSchools/service/SchoolService";
import {MOCK_PROJECTS} from "./projects/ProjectsService";

export const getMockData = async (): Promise<Data<true>> => {

    const data: Data<true> = {
        skills: MOCK_SKILLS,
        jobs: MOCK_JOBS,
        schools: MOCK_SCHOOLS,
        projects: MOCK_PROJECTS
    };

    return data;
};

export const formatMockData = (rawData: Data<true>): Data<false> => {

    const data: Data<false> = {
        skills: {
            hard: [...rawData.skills.hard]
        },
        projects: rawData.projects.map<Pick<ProjectOne, 'id'> | (Pick<ProjectGroup, 'id'> & { group: Pick<ProjectOne, 'id'> })>(p => {
            if (p.type === 'project-one') {
                return {id: p.id};
            }

            return {
                id: p.id,
                group: p.group.map(id => ({id}))
            };
        }) as any,
        jobs: rawData.jobs.map<Pick<Job, 'id'>>(j => ({id: j.id})) as any,
        schools: rawData.schools.map<Pick<School, 'id'>>(s => ({id: s.id})) as any
    };

    const fillProjectOne = (project: ProjectOne, rawProject: ProjectOne<true>): ProjectOne => {
        Object.assign<ProjectOne, ProjectOne>(project, {
            ...rawProject,
            skills: {
                hard: rawProject.skills.hard.map(h => data.skills.hard.find(h2 => h2.id === h)!)
            },
            job: rawProject.job ? data.jobs.find(j => j.id === rawProject.job)! : undefined
        });
        return project;
    };

    data.projects.forEach(project => {
        const rawProject = rawData.projects.find(p => p.id === project.id)!;

        if (rawProject.type === 'project-one') {
            fillProjectOne(project as ProjectOne, rawProject);
        } else {
            Object.assign<Project, ProjectGroup>(project, {
                ...rawProject,
                job: rawProject.job ? data.jobs.find(j => j.id === rawProject.job)! : undefined,
                group: (project as ProjectGroup).group.map(p => {
                    const rawP = rawProject.group.find(raw => p.id === raw.id)!;
                    return fillProjectOne(p as ProjectOne, rawP);
                })
            });
        }
    });

    data.jobs.forEach(job => {
        const rawJob = rawData.jobs.find(j => j.id === job.id)!;

        Object.assign<Job, Job>(job, {
            ...rawJob,
            skills: {
                hard: rawJob.skills.hard.map(h => data.skills.hard.find(h2 => h2.id === h)!)
            },
            projects: rawJob.projects.map(id => data.projects.find(p => p.id === id)!)
        });
    });

    data.schools.forEach(school => {
        const rawShool = rawData.schools.find(s => s.id === school.id)!;

        Object.assign<School, School>(school, {
            ...rawShool,
            skills: {
                hard: rawShool.skills.hard.map(h => data.skills.hard.find(h2 => h2.id === h)!)
            },
            job: rawShool.job ? data.jobs.find(j => j.id === rawShool.job)! : undefined
        });
    });

    return data;
};
