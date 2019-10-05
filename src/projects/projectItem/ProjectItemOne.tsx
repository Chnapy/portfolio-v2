import {ProjectOne} from "../../DataTypes";
import React from "react";
import style from './projectItemOne.module.scss';

export interface ProjectItemOneProps {
    project: ProjectOne;
}

export const ProjectItemOne: React.FC<ProjectItemOneProps> = ({project: {name, description, logo, context, startDate, state, medias}}) => {

    const backImg = medias.find(media => media.type === 'image');

    return <div className={style.item}>

        <img src={backImg && backImg.url} alt={'background'} className={style.back}/>

        <div className={style.front}>

            <div className={style.name}>{name}</div>

        </div>

    </div>
};
