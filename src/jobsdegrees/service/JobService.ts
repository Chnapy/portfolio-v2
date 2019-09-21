import {Service} from "../../core/Service";
import {Job} from "../../DataTypes";
import icon_vizuall from "../../_assets/job/vizuall_icon.svg";
import moment from "moment";
import MapIcons from "../../MapIcons";
import {StoreAction} from "../../core/StoreAction";

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
        id: 1,
        type: 'salaryman',
        companyName: 'Vizu All',
        jobFunction: {
            fr: 'Développeur Fullstack',
            en: 'Fullstack developper'
        },
        description: {
            fr: 'description fr...',
            en: `
                        Conception d'une application web de création de datavisualisations, FastBrick. 
                        Concurrente directe de solutions comme Power BI, Tableau Software ou encore QlikView.
                    `
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
            hard: [
                {
                    id: 'ts',
                    name: 'TypeScript',
                    color: '#007acc',
                    icon: {
                        type: 'className',
                        className: 'devicon-typescript-plain'
                    },
                    level: 9
                },
                {
                    id: 'js',
                    name: 'JavaScript',
                    color: '#f0db4f',
                    icon: {
                        type: 'className',
                        className: 'devicon-javascript-plain'
                    },
                    level: 9
                },
                {
                    id: 'react',
                    name: 'React',
                    color: '#61dafb',
                    icon: {
                        type: 'className',
                        className: 'devicon-react-original'
                    },
                    level: 9
                },
                {
                    id: 'react_router',
                    name: 'React Router',
                    color: '#D0021B',
                    icon: {
                        type: 'img',
                        iconPath: MapIcons.getIcon('react-router'),//TODO
                    },
                    level: 8
                },
                {
                    id: 'redux',
                    name: 'Redux',
                    color: '#764ABC',
                    icon: {
                        type: 'img',
                        iconPath: MapIcons.getIcon('redux'),//TODO
                    },
                    level: 9
                },
                {
                    id: 'node',
                    name: 'Node',
                    color: '#83CD29',
                    icon: {
                        type: 'img',
                        iconPath: MapIcons.getIcon('node'),//TODO
                    },
                    level: 8
                }
            ]
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
