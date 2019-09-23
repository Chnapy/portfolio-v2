import React, {CSSProperties} from "react";
import css from './jobRight.module.scss';
import {JobSkills} from "./jobSkills/JobSkills";
import {TransitionableProps} from "../jobPane/JobPane";
import {Job, School, Skills} from "../../DataTypes";
import classNames from "classnames";

export type JobRightProps = TransitionableProps & {
    skills: Skills;
} & ({
    type: Job['type'];
    jobSchool: Job;
} | {
    type: School['type'];
    jobSchool: School;
    jobRelated?: Job;
})

export class JobRight extends React.Component<JobRightProps> {

    private RenderPart({iconClass, title, children}: { iconClass: string; title: string; children: React.ReactElement; }): React.ReactElement {
        return <div className={css.part}>
            <div className={css.title}>
            <span className="icon is-small">
                <i className={classNames("fas", iconClass)} aria-hidden="true"/>
            </span>
                <span>{title}</span>
            </div>

            {children}
        </div>;
    }

    render() {
        const {
            skills, style, jobSchool
        } = this.props;
        const {
            colors: {
                mainBackground
            }
        } = jobSchool;

        let jobRelated: Job | undefined;
        if (this.props.type === 'school') {
            jobRelated = this.props.jobRelated;
        }

        const rootStyle: CSSProperties = {
            backgroundColor: mainBackground,
            ...style
        };

        return (
            <div className={css.right} style={rootStyle}>

                <div className={css.rightEffect}/>

                <div>

                    {skills.hard.length && <this.RenderPart title={'Skills'} iconClass={'fa-th'}>
                        <JobSkills skills={skills}/>
                    </this.RenderPart>}

                    {jobRelated && <this.RenderPart title={'Job'} iconClass={'fa-briefcase'}>
                        <a href={'#'} className="button is-medium" style={{
                            color: jobRelated.colors.secondaryColor,
                            backgroundColor: jobRelated.colors.secondaryBackground
                        }}>
                            <img className={'icon'} src={jobRelated.logo} alt={jobRelated.name}/>
                            <span>{jobRelated.name}</span>
                        </a>
                    </this.RenderPart>}

                </div>

            </div>
        );
    }

}