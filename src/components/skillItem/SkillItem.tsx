import React from 'react';
import css from './skillItem.module.scss';
import classNames from 'classnames';
import MapIcons, { Icon } from '../../MapIcons';

type SkillItemType = 'string' | 'tag' | 'icon' | 'full-icon';
type SkillName = 'ts' | 'react' | 'node' | 'java' | 'hummus';

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
        sub: string;
    };
} = {
    ts: {
        icon: {
            type: 'className',
            className: 'devicon-typescript-plain'
        },
        sub: 'TypeScript'
    },
    react: {
        icon: {
            type: 'className',
            className: 'devicon-react-original'
        },
        sub: 'React'
    },
    node: {
        icon: {
            type: 'className',
            className: 'devicon-nodejs-plain'
        },
        sub: 'Node'
    },
    java: {
        icon: {
            type: 'className',
            className: 'devicon-java-plain'
        },
        sub: 'Java'
    },
    hummus: {
        icon: {
            type: 'img',
            img: 'hummus'
        },
        sub: 'Making hummus'
    }
};

export function SkillItem({ type, skillName, colored, className }: SkillItemProps) {

    const { icon, sub } = mapTypeToContent[ skillName ];

    const childProps: SkillItemChildProps = {
        colored: !!colored,
        icon,
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
        <div className={classNames(css.skill, className, 'box')}>

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

function SkillItemFullIcon({ colored, icon, sub }: SkillItemChildProps) {

    return <>

        {getIcon(icon, colored)}

        <div className={css.skillSub}>{sub}</div>
    </>;
}