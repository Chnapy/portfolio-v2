import {ProjectOne} from "../../DataTypes";
import React, {CSSProperties} from "react";
import style from './projectItemOne.module.scss';
import {ProjectContextComponent} from "../components/projectContext/ProjectContextComponent";
import {SkillItem} from "../../components/skillItem/SkillItem";
import {DateComponent} from "../../components/dateComponent/DateComponent";

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

        <div className={style.content}>

            <div className={style.back} style={backStyle}/>

            <div className={style.front}>

                <div>

                    <div className={style.firstLine}>

                        <div>
                            {logo && <img src={logo} alt={'logo'} className={style.logo}/>}

                            <div className={style.name}>{name}</div>
                        </div>

                        <DateComponent className={style.dates}
                                       startDate={startDate}
                                       endDate={state.type === 'finished' ? state.endDate : undefined}/>

                    </div>

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

        <div className={style.skills}>
            {skills.hard.map(skill => (
                <SkillItem key={skill.id} type={"icon"} skill={skill} colored={true}/>
            ))}
        </div>

        <div className={style.links}>
            {Object.keys(links).map((k) => {
                const link = links[k as keyof typeof links];
                if(link) {
                    return link.url;
                }
            })}
        </div>

    </div>
};
