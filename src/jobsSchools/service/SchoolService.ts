import {Service} from "../../core/Service";
import {School} from "../../DataTypes";
import {StoreAction} from "../../core/StoreAction";
import moment from "moment";
import {LoremIpsum} from "../../LoremIpsum";

const MOCK_SCHOOLS: School[] = [
    {
        type: 'school',
        id: 1,
        name: 'IUT Montreuil',
        capacity: {
            en: 'DUT Informatique',
            fr: 'DUT Informatique'
        },
        description: {
            en: LoremIpsum,
            fr: LoremIpsum
        },
        endDate: moment({y: 2015}),
        logo: 'https://www.iut.univ-paris8.fr/files/iutmontreuil2010_logo.png',
        links: {website: {url: 'https://www.iut.univ-paris8.fr'}},
        skills: {
            hard: ['java']
        },
        projects: [],
        colors: {
            mainBackground: '',
            mainColor: ''
        },
        buildings: []
    }
];

export class SchoolService extends Service<School[]> {
    getInitialState(): School[] {
        return MOCK_SCHOOLS;
    }

    onReduce(state: Readonly<School[]>, action: StoreAction): Readonly<School[]> {
        return state;
    }

}