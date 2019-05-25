import React from 'react';
import css from './skillItem.module.scss';
import classNames from 'classnames';

type SkillItemType = 'string' | 'tag' | 'icon' | 'full-icon';
type SkillName = 'ts' | 'react' | 'node' | 'java';

interface SkillItemProps {
    type: SkillItemType;
    skillName: SkillName;
    colored?: boolean;
    className?: string;
    children?: never;
}

interface SkillItemChildProps {
    colored?: boolean;
    iconClassName: string;
    sub: string;
    children?: never;
}

const mapTypeToContent: {
    [ k in SkillName ]: {
        iconClassName: string;
        sub: string;
    };
} = {
    ts: {
        iconClassName: 'devicon-typescript-plain',
        sub: 'TypeScript'
    },
    react: {
        iconClassName: 'devicon-react-original',
        sub: 'React'
    },
    node: {
        iconClassName: 'devicon-nodejs-plain',
        sub: 'Node'
    },
    java: {
        iconClassName: 'devicon-java-plain',
        sub: 'Java'
    }
};

export function SkillItem({ type, skillName, colored, className }: SkillItemProps) {

    const { iconClassName, sub } = mapTypeToContent[ skillName ];

    const childProps = {
        colored,
        iconClassName,
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

function SkillItemFullIcon({ colored, iconClassName, sub }: SkillItemChildProps) {

    return <>

        <i className={classNames(iconClassName, {
            colored
        }, css.skillIcon)} />

        <div className={css.skillSub}>{sub}</div>
    </>;
}