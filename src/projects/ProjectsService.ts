import {Service} from "../core/Service";
import {Project} from "../DataTypes";
import {StoreAction} from "../core/StoreAction";
import {LoremIpsum} from "../LoremIpsum";
import moment from "moment";

const MOCK_PROJECTS: Project[] = [
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
            hard: []
        },
        tags: [],
        startDate: moment(),
        state: {type: 'finished', endDate: moment()},
        links: {}
    }
];

export class ProjectsService extends Service<Project[]> {
    getInitialState(): Project[] {
        return MOCK_PROJECTS;
    }

    onReduce(state: Readonly<Project[]>, action: StoreAction): Readonly<Project[]> {

        return state;
    }

}