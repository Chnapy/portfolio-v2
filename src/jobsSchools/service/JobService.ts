import {Service} from "../../core/Service";
import {Job} from "../../DataTypes";
import icon_vizuall from "../../_assets/job/vizuall_icon.svg";
import moment from "moment";
import {StoreAction} from "../../core/StoreAction";
import {LoremIpsum} from "../../LoremIpsum";

const parts: string[] = [
    'buildingTiles_030.png',
    'buildingTiles_050.png',
    'buildingTiles_074.png'
];

let buildingImg: string[];

const fetchPromises = Promise.all(
    parts.map(part => fetch(process.env.PUBLIC_URL + '/assets/kenney/isometric-buildings/PNG/' + part))
)
    .then(res => Promise.all(res.map(r => r.blob())))
    .then(blobs => {
        buildingImg = blobs.map(URL.createObjectURL)
    });

const MOCK_JOBS: Job[] = [
    {
        type: 'job',
        id: 1,
        jobType: 'salaryman',
        name: 'Vizu All',
        capacity: {
            fr: 'Développeur Fullstack',
            en: 'Fullstack developper'
        },
        description: {
            fr: LoremIpsum,
            en: `
                        Conception d'une application web de création de datavisualisations, FastBrick. 
                        Concurrente directe de solutions comme Power BI, Tableau Software ou encore QlikView.
                    ${LoremIpsum}`
        },
        tags: [{
            fr: 'tag fr',
            en: 'Datavisualization'
        }, {
            fr: 'tag fr',
            en: 'Product'
        }, {
            fr: 'tag fr',
            en: 'Startup'
        }],
        logo: icon_vizuall,
        medias: [],
        startDate: moment(),
        endDate: moment(),
        skills: {
            hard: ['ts', 'js', 'react', 'react_router', 'redux', 'node']
        },
        colors: {
            mainBackground: '#2b3e4f',
            mainColor: '#fff',
            secondaryBackground: '#ddd',
            secondaryColor: '#2b3e4f'
        },
        links: {
            website: {
                url: 'http://vizuall.fr/'
            },
            linkedin: {
                url: 'https://www.linkedin.com/company/vizu-all/'
            }
        },
        projects: [],
        buildings: [
            {
                src: '',
                pos: {
                    x: 0,
                    y: -34
                }
            },
            {
                src: '',
                pos: {
                    x: 17,
                    y: 38
                }
            },
            {
                src: '',
                pos: {
                    x: 17,
                    y: 69
                }
            }
        ]
    }
];

export class JobService extends Service<Job[]> {
    getInitialState(): Job[] {
        return MOCK_JOBS;
    }

    onReduce(state: Readonly<Job[]>, action: StoreAction): Readonly<Job[]> {

        // to delete
        if (buildingImg) {
            state[0].buildings.forEach((b, i) => b.src = buildingImg[i]);
        }
        return state;
    }

}
