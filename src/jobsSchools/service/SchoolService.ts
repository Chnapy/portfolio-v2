import {Service} from "../../core/Service";
import {School} from "../../DataTypes";
import {StoreAction} from "../../core/StoreAction";
import moment from "moment";
import {LoremIpsum} from "../../LoremIpsum";

export const MOCK_SCHOOLS: School<true>[] = [
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
        job: 1,
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
        return [];
    }

    onReduce(state: Readonly<School[]>, action: StoreAction): Readonly<School[]> {

        switch(action.type) {
            case 'data':
                return action.data.schools;
        }

        return state;
    }

}