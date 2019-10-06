import {ProjectOne} from "../../DataTypes";
import React, {CSSProperties} from "react";
import style from './projectItemOne.module.scss';
import {ProjectContextComponent} from "../components/projectContext/ProjectContextComponent";
import {SkillItem} from "../../components/skillItem/SkillItem";

export interface ProjectItemOneProps {
    project: ProjectOne;
}

export const ProjectItemOne: React.FC<ProjectItemOneProps> = ({
                                                                  project: {
                                                                      name, description, logo, context,
                                                                      startDate, state, medias, tags,
                                                                      job, links, skills
                                                                  }
                                                              }) => {

    const backImg = medias.find(media => media.type === 'image');

    const backStyle: CSSProperties = {
        backgroundImage: backImg && `url(${backImg.url})`
    };

    return <div className={style.item} data-context={context}>

        <div className={style.right}>
            {skills.hard.map(skill => (
                <SkillItem type={"icon"} skill={skill}/>
            ))}
        </div>

        <div className={style.back} style={backStyle}/>

        <div className={style.front}>

            <div>

                {logo && <img src={logo} alt={'logo'} className={style.logo}/>}

                <div className={style.name}>{name}</div>

                <span className={style.startDate}>{startDate.format('MM/YYYY')}</span>

                <div className={style.tags}>
                    {tags.map(tag => <span key={tag.en} className={'tag'}>
                        {tag.en}
                    </span>)}
                </div>

            </div>

            <div>

            </div>

        </div>

        <ProjectContextComponent context={context}/>

    </div>
};
