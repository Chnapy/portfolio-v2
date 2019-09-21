import React, {CSSProperties} from "react";
import style from './jobRight.module.scss';
import {JobSkills} from "../jobRight/jobSkills/JobSkills";
import {JobPanePartProps} from "../jobPane/JobPane";

export interface JobRightProps extends JobPanePartProps {
}

export class JobRight extends React.Component<JobRightProps> {

    render() {
        const {job, visible} = this.props;
        const {
            skills,
            colors: {
                mainBackground
            }
        } = job;

        const rightEffectStyle: CSSProperties = {
            backgroundColor: mainBackground
        };

        return (
            <div className={style.right} style={rightEffectStyle}>

                <div className={style.rightEffect}/>

                <JobSkills skills={skills}/>

            </div>
        );
    }

}