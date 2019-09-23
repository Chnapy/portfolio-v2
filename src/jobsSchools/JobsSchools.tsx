import React from "react";
import css from "./pageJobsSchools.module.scss";
import classNames from "classnames";
import {BulmaSection} from "../components/bulma/BulmaSection";
import {JobPane} from "./jobPane/JobPane";
import {connect} from "react-redux";
import StoreState from "../core/StoreState";
import {Job, School, Skills, SkillsID} from "../DataTypes";
import {ParallaxLayer} from "react-spring/renderprops-addons";

export interface JobsSchoolsProps {
    jobs: Job[];
    schools: School[];
    skills: Skills;
}

class _JobsSchools extends React.Component<JobsSchoolsProps> {

    render() {
        const {jobs, schools} = this.props;

        const jobsSchools: (Job | School)[] = [...jobs, ...schools]
            .sort((a, b) => a.endDate && a.endDate.isAfter(b.endDate) ? -1 : 1);

        return (
            <div className={css.page} id={css.page_jobsschools}>

                <div className={css.layer_0}>

                </div>

                <div className={classNames(css.layer_1, css.content)}>

                    <BulmaSection>

                        <div className="container is-size-5">

                            <h1 className={classNames("title is-1", "has-text-white")}>
                                Jobs & Degrees
                            </h1>

                        </div>

                    </BulmaSection>

                    <ParallaxLayer offset={.7} speed={.2}>

                        {jobsSchools.map(jobSchool => {
                            if (jobSchool.type === 'job') {
                                return <JobPane
                                    key={`${jobSchool.type}${jobSchool.id}`}
                                    type={jobSchool.type}
                                    jobSchool={jobSchool}
                                    skills={this.getSkillsByIDs(jobSchool.skills)}
                                />;
                            } else {
                                const jobRelated = jobSchool.job
                                    ? jobsSchools.find((js): js is Job => js.type === 'job' && js.id === jobSchool.job)
                                    : undefined;
                                return <JobPane
                                    key={`${jobSchool.type}${jobSchool.id}`}
                                    type={jobSchool.type}
                                    jobSchool={jobSchool}
                                    skills={this.getSkillsByIDs(jobSchool.skills)}
                                    jobRelated={jobRelated}
                                />;
                            }
                        })}

                    </ParallaxLayer>

                </div>

                <div className={classNames(css.layer_2, css.frame)}>

                </div>

            </div>
        );
    }

    private getSkillsByIDs(skillsID: SkillsID): Skills {
        const {skills} = this.props;
        const jobSkills: Skills = {
            hard: []
        };

        let k: keyof SkillsID;
        Object.keys(skillsID).forEach(_k => {
            k = _k as keyof SkillsID;
            jobSkills[k] = skillsID[k].map(id => skills[k].find(s => s.id === id)!);
        });

        return jobSkills;
    }
}

export const JobsSchools = connect<JobsSchoolsProps, {}, {}, StoreState>(
    state => ({
        jobs: state.jobs,
        schools: state.schools,
        skills: state.skills
    })
)(_JobsSchools);
