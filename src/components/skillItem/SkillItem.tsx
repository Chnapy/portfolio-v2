import React from 'react';
import css from './skillItem.module.scss';
import classNames from 'classnames';
import MapIcons, { Icon } from '../../MapIcons';

type SkillItemType = 'string' | 'tag' | 'icon' | 'full-icon';
export type SkillName = 'ts'
    | 'react' | 'redux' | 'react-router' | 'd3' | 'crossfilter'
    | 'sass' | 'antd' | 'bootstrap'
    | 'node' | 'sequelize' | 'java'
    | 'jest'
    | 'webpack' | 'git'
    | 'hummus';

interface SkillItemProps {
    type: SkillItemType;
    skillName: SkillName;
    colored?: boolean;
    className?: string;
    children?: never;
}

interface SkillItemChildProps {
    colored: boolean;
    icon: SkillItemIcon;
    level: number;
    sub: string;
    children?: never;
}

type SkillItemIcon = {
    type: 'className';
    className: string;
} | {
    type: 'img';
    img: Icon;
};

const mapTypeToContent: {
    [ k in SkillName ]: {
        icon: SkillItemIcon;
        className: string;
        sub: string;
        level: number;
    };
} = {
    ts: {
        icon: {
            type: 'className',
            className: 'devicon-typescript-plain'
        },
        className: css.skill_ts,
        sub: 'TypeScript',
        level: 9
    },
    react: {
        icon: {
            type: 'className',
            className: 'devicon-react-original'
        },
        className: css.skill_react,
        sub: 'React',
        level: 9
    },
    'react-router': {
        icon: {
            type: 'img',
            img: 'react-router'
        },
        className: css.skill_react_router,
        sub: 'React Router',
        level: 8
    },
    redux: {
        icon: {
            type: 'img',
            img: 'redux'
        },
        className: css.skill_redux,
        sub: 'Redux',
        level: 8
    },
    node: {
        icon: {
            type: 'img',
            img: 'node'
        },
        className: css.skill_node,
        sub: 'Node',
        level: 8
    },
    jest: {
        icon: {
            type: 'img',
            img: 'jest'
        },
        className: css.skill_jest,
        sub: 'Jest',
        level: 7
    },
    antd: {
        icon: {
            type: 'img',
            img: 'antd'
        },
        className: css.skill_antd,
        sub: 'Ant Design',
        level: 7
    },
    sequelize: {
        icon: {
            type: 'className',
            className: 'devicon-sequelize-plain'
        },
        className: css.skill_sequelize,
        sub: 'Sequelize',
        level: 7
    },
    java: {
        icon: {
            type: 'className',
            className: 'devicon-java-plain'
        },
        className: css.skill_java,
        sub: 'Java',
        level: 7
    },
    d3: {
        icon: {
            type: 'className',
            className: 'devicon-d3js-plain'
        },
        className: css.skill_d3,
        sub: 'D3',
        level: 7
    },
    crossfilter: {
        icon: {
            type: 'img',
            img: 'crossfilter'
        },
        className: css.skill_crossfilter,
        sub: 'Crossfilter',
        level: 9
    },
    sass: {
        icon: {
            type: 'className',
            className: 'devicon-sass-original'
        },
        className: css.skill_sass,
        sub: 'SASS',
        level: 8
    },
    bootstrap: {
        icon: {
            type: 'className',
            className: 'devicon-bootstrap-plain'
        },
        className: css.skill_bootstrap,
        sub: 'Bootstrap',
        level: 8
    },
    webpack: {
        icon: {
            type: 'className',
            className: 'devicon-webpack-plain'
        },
        className: css.skill_webpack,
        sub: 'Webpack',
        level: 7
    },
    git: {
        icon: {
            type: 'className',
            className: 'devicon-git-plain'
        },
        className: css.skill_git,
        sub: 'Git',
        level: 8
    },
    hummus: {
        icon: {
            type: 'img',
            img: 'hummus'
        },
        className: css.skill_hummus,
        sub: 'Making hummus',
        level: 10
    }
};

export function SkillItem({ type, skillName, colored, className }: SkillItemProps) {

    const { icon, sub, className: skillClassName, level } = mapTypeToContent[ skillName ];

    const childProps: SkillItemChildProps = {
        colored: !!colored,
        icon,
        level,
        sub
    };

    let content;
    switch (type) {
        case 'full-icon':
            content = <SkillItemFullIcon {...childProps} />;
            break;
        default:
            throw new Error();
    }

    return (
        <div className={classNames('box', css.skill, skillClassName, className)}>

            {content}

        </div>
    );
}

function getIcon(icon: SkillItemIcon, colored: boolean): JSX.Element {
    switch (icon.type) {
        case 'className':
            return <i className={classNames(icon.className, {
                colored
            }, css.skillIcon)} />;
        case 'img':
            return <img src={MapIcons.getIcon(icon.img)} className={css.skillIcon} />;
    }
}

function SkillItemFullIcon({ colored, icon, sub, level }: SkillItemChildProps) {

    return <>

        {getIcon(icon, colored)}

        <div className={css.skillSub}>{sub}</div>

        <progress className={classNames("progress", "is-small", css.skillLevel)} value={level} max={10}>{level * 10}%</progress>
    </>;
}