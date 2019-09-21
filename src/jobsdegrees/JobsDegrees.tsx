import React from "react";
import css from "./pageJobsDegrees.module.scss";
import classNames from "classnames";
import {BulmaSection} from "../components/bulma/BulmaSection";
import {JobPane} from "./jobPane/JobPane";
import {connect} from "react-redux";
import StoreState from "../core/StoreState";
import {Job} from "../DataTypes";

export interface JobsDegreesProps {
    jobs: Job[];
}

class _JobsDegrees extends React.Component<JobsDegreesProps> {

    render() {
        const {jobs} = this.props;

        return (
            <div className={css.page} id={css.page_jobsdegrees}>

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

                    {jobs.map(job => <JobPane key={job.id} job={job}/>)}

                </div>

                <div className={classNames(css.layer_2, css.frame)}>

                </div>

            </div>
        );
    }
}

export const JobsDegrees = connect<JobsDegreesProps, {}, {}, StoreState>(
    state => ({
        jobs: state.jobs
    })
)(_JobsDegrees);
