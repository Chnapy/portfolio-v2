import React, {CSSProperties} from "react";
import css from './jobRight.module.scss';
import {JobSkills} from "./jobSkills/JobSkills";
import {TransitionableProps} from "../jobPane/JobPane";
import {Job, School, Skills} from "../../DataTypes";

export interface JobRightProps extends TransitionableProps {
    jobSchool: Job | School;
    skills: Skills;
}

export class JobRight extends React.Component<JobRightProps> {

    render() {
        const {
            skills, style, jobSchool: {
                colors: {
                    mainBackground
                }
            }
        } = this.props;

        const rootStyle: CSSProperties = {
            backgroundColor: mainBackground,
            ...style
        };

        return (
            <div className={css.right} style={rootStyle}>

                <div className={css.rightEffect}/>

                <JobSkills skills={skills}/>

            </div>
        );
    }

}