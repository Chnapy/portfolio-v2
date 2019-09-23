import React, {CSSProperties} from "react";
import css from './jobCenter.module.scss';
import classNames from "classnames";
import {TransitionableProps} from "../jobPane/JobPane";
import {Job, School} from "../../DataTypes";

export interface JobCenterProps extends TransitionableProps {
    jobSchool: Job | School;
}

export class JobCenter extends React.Component<JobCenterProps> {

    render() {
        const {jobSchool, style} = this.props;
        const {
            description,
            capacity,
            colors: {
                mainBackground,
                mainColor
            }
        } = jobSchool;
        const medias = jobSchool.type === 'job' ? jobSchool.medias : [];

        const rootStyle: CSSProperties = {
            backgroundColor: mainBackground,
            color: mainColor,
            ...style
        };

        return (
            <div className={classNames("container", css.column)} style={rootStyle}>

                <div className={classNames(css.jobFunction)}>
                    <span className={classNames("subtitle is-2")}>{capacity.en}</span>
                </div>

                <p className={classNames(css.description)}>
                    {description.en}
                </p>

                {medias.map(m => <img key={m.url} src={m.url} />)}

            </div>
        );
    }

}