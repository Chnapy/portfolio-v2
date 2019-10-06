import {ProjectContext} from "../../../DataTypes";
import React from "react";
import style from './projectContext.module.scss';
import classNames from "classnames" ;

export interface ProjectContextProps {
    context: ProjectContext;
}

interface RenderProps {
    icon: string;
    content: string;
}

export const ProjectContextComponent: React.FC<ProjectContextProps> = ({context}): React.ReactElement => {

    const renderProps: RenderProps = context === 'personal'
        ? {
            icon: 'home',
            content: 'Projet personnel'
        }
        : {
            icon: 'building',
            content: 'Projet professionnel'
        };

    return <div className={classNames('tag', style.context, {
        'is-success': context === 'personal',
        'is-primary': context === 'professional'
    })}>
        <span className={'icon'}>
            <i className={classNames('fas', `fa-${renderProps.icon}`)}/>
        </span>

        <span className={style.content}>{renderProps.content}</span>
    </div>;
};
