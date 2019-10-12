import {Service} from "../../core/Service";
import {HardSkill, Skills} from "../../DataTypes";
import MapIcons from "../../MapIcons";
import {StoreAction} from "../../core/StoreAction";

const MOCK_HARDSKILLS: HardSkill[] = [
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
    },
    {
        id: 'jest',
        name: 'Jest',
        color: '#99425b',
        icon: {
            type: 'img',
            iconPath: MapIcons.getIcon('jest'),//TODO
        },
        level: 7
    },
    {
        id: 'sequelize',
        name: 'Sequelize',
        color: '#3b4b72',
        icon: {
            type: 'className',
            className: 'devicon-sequelize-plain'
        },
        level: 7
    },
    {
        id: 'java',
        name: 'Java',
        color: '#EA2D2E',
        icon: {
            type: 'className',
            className: 'devicon-java-plain'
        },
        level: 7
    },
    {
        id: 'd3',
        name: 'D3',
        color: '#f7974e',
        icon: {
            type: 'className',
            className: 'devicon-d3js-plain'
        },
        level: 7
    },
    {
        id: 'crossfilter',
        name: 'crossfilter',
        color: '#2E3B4E',
        icon: {
            type: 'img',
            iconPath: MapIcons.getIcon('crossfilter'),//TODO
        },
        level: 8
    },
    {
        id: 'sass',
        name: 'SASS',
        color: '#CB6699',
        icon: {
            type: 'className',
            className: 'devicon-sass-original'
        },
        level: 8
    },
    {
        id: 'antd',
        name: 'Ant Design',
        color: '#F0606F',
        icon: {
            type: 'img',
            iconPath: MapIcons.getIcon('antd'),//TODO
        },
        level: 8
    },
    {
        id: 'bootstrap',
        name: 'Bootstrap',
        color: '#5B4282',
        icon: {
            type: 'className',
            className: 'devicon-bootstrap-plain'
        },
        level: 8
    },
    {
        id: 'webpack',
        name: 'Webpack',
        color: '#1c78c0',
        icon: {
            type: 'className',
            className: 'devicon-webpack-plain'
        },
        level: 7
    },
    {
        id: 'git',
        name: 'Git',
        color: '#F34F29',
        icon: {
            type: 'className',
            className: 'devicon-git-plain'
        },
        level: 8
    },
    {
        id: 'hummus',
        name: 'Hummus making',
        color: '#f7a16e',
        icon: {
            type: 'img',
            iconPath: MapIcons.getIcon('hummus'),//TODO
        },
        level: 10
    }
];

export const MOCK_SKILLS: Skills = {
    hard: MOCK_HARDSKILLS
};

export class SkillService extends Service<Skills> {
    getInitialState(): Skills {
        return {
            hard: []
        };
    }

    onReduce(state: Readonly<Skills>, action: StoreAction): Readonly<Skills> {

        switch(action.type) {
            case 'data':
                return action.data.skills;
        }

        return state;
    }

}