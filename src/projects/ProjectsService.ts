import {Service} from "../core/Service";
import {Project} from "../DataTypes";
import {StoreAction} from "../core/StoreAction";
import {LoremIpsum} from "../LoremIpsum";
import moment from "moment";

export const MOCK_PROJECTS: Project<true>[] = [
    {
        type: 'project-one',
        id: 1,
        context: 'personal',
        name: 'Videothèque',
        description: {
            en: LoremIpsum,
            fr: LoremIpsum
        },
        medias: [
            {
                type: 'image',
                url: 'http://richardhaddad.fr/img/projets/videotheque/vitrine_1.jpg'
            }
        ],
        skills: {
            hard: ['ts']
        },
        tags: [
            {
                en: 'Media center',
                fr: 'Media center'
            },
            {
                en: 'toto',
                fr: 'toto'
            }
        ],
        startDate: moment(),
        state: {type: 'finished', endDate: moment()},
        links: {}
    }
];

export class ProjectsService extends Service<Project[]> {
    getInitialState(): Project[] {
        return [];
    }

    onReduce(state: Readonly<Project[]>, action: StoreAction): Readonly<Project[]> {

        switch(action.type) {
            case 'data':
                return action.data.projects;
        }

        return state;
    }

}