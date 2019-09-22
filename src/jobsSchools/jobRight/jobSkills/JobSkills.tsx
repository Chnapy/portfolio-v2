import style from './jobSkills.module.scss';
import React from "react";
import {Skills} from "../../../DataTypes";
import {SkillItem} from "../../../components/skillItem/SkillItem";

export interface JobSkillsProps {
    skills: Skills;
}

export const JobSkills: React.FC<JobSkillsProps> = ({skills}) => {

    const {hard} = skills;

    return <div className={style.skills}>
        {hard.map(skill => <SkillItem key={skill.id} type={"tag"} skill={skill} colored={true} />)}
    </div>;
};