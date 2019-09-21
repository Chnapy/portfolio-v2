import React, {CSSProperties} from "react";
import css from './jobRight.module.scss';
import {JobSkills} from "../jobRight/jobSkills/JobSkills";
import {JobPanePartProps} from "../jobPane/JobPane";

export interface JobRightProps extends JobPanePartProps {
}

export class JobRight extends React.Component<JobRightProps> {

    render() {
        const {job, visible, style} = this.props;
        const {
            skills,
            colors: {
                mainBackground
            }
        } = job;

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