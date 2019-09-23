import React from 'react';
import css from './skillItem.module.scss';
import classNames from 'classnames';
import {HardSkill, Icon} from "../../DataTypes";

type SkillItemType = 'string' | 'tag' | 'icon' | 'full-icon';

interface SkillItemProps {
    type: SkillItemType;
    skill: HardSkill;
    colored?: boolean;
    className?: string;
    children?: never;
}

interface SkillItemChildProps {
    colored: boolean;
    icon: Icon;
    level: number;
    sub: string;
    children?: never;
}

const skillsAlreadyUsed: Set<HardSkill['id']> = new Set();

const ref = document.querySelector('script')!;

function onNewSkill(id: HardSkill['id'], color: string): void {
    skillsAlreadyUsed.add(id);

    const style = document.createElement('style');
    style.innerHTML = `
      .${css.skill}_${id} .${css.skillLevel}::-webkit-progress-value {
        background: ${color};
      }
      
      .${css.skill}_${id} .${css.skillLevel}::-moz-progress-value {
        background: ${color};
      }
      
      .${css.skill}_${id} .${css.skillLevel} {
        color: ${color};
      }
      
      .${css.skill}_${id}[data-type="full-icon"]:hover, 
      .${css.skill}_${id}[data-type="full-icon"]:focus, 
      .${css.skill}_${id}[data-type="full-icon"]:active {
        background-color: ${color};
        border-color: ${color};
      }
      
      .${css.skill}_${id}[data-type="tag"]::before {
        background-color: ${color};
      }
    `;
    ref.parentNode!.insertBefore(style, ref);
}

export function SkillItem({type, skill, colored, className}: SkillItemProps) {

    const {id, name, icon, color, level} = skill;

    if (!skillsAlreadyUsed.has(id)) {
        onNewSkill(id, color);
    }

    const childProps: SkillItemChildProps = {
        colored: !!colored,
        icon,
        level,
        sub: name
    };

    let content;
    switch (type) {
        case 'full-icon':
            content = <SkillItemFullIcon {...childProps} />;
            break;
        case 'tag':
            content = <SkillItemTag {...childProps} />;
            break;
        default:
            throw new Error();
    }

    return (
        <div className={classNames('box', css.skill, `${css.skill}_${id}`, className)} data-type={type}>

            {content}

        </div>
    );
}

function getIcon(icon: Icon, colored: boolean): JSX.Element {
    switch (icon.type) {
        case 'className':
            return <i className={classNames(icon.className, {
                colored
            }, css.skillIcon)}/>;
        case 'img':
            return <img src={icon.iconPath} className={css.skillIcon}/>;
    }
}

function SkillItemFullIcon({colored, icon, sub, level}: SkillItemChildProps) {

    return <>

        {getIcon(icon, colored)}

        <div className={css.skillSub}>{sub}</div>

        <progress className={classNames("progress", "is-small", css.skillLevel)} value={level} max={10}>{level * 10}%
        </progress>
    </>;
}

function SkillItemTag({colored, icon, sub, level}: SkillItemChildProps) {

    return <>

        {getIcon(icon, colored)}

        <span className={css.skillSub}>{sub}</span>
    </>;
}