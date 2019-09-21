import React, {CSSProperties} from "react";
import style from './jobCenter.module.scss';
import classNames from "classnames";
import {JobPanePartProps} from "../jobPane/JobPane";

export interface JobCenterProps extends JobPanePartProps {
}

export class JobCenter extends React.Component<JobCenterProps> {

    render() {
        const {
            description,
            jobFunction,
            type,
            medias,
            colors: {
                mainBackground,
                mainColor
            }
        } = this.props.job;

        const contentStyle: CSSProperties = {
            backgroundColor: mainBackground,
            color: mainColor
        };

        return (
            <div className={classNames("container", style.column)} style={contentStyle}>

                <div className={classNames(style.jobFunction)}>
                    <span className={classNames("subtitle is-2")}>{jobFunction.en}</span>
                </div>

                <p className={classNames(style.description)}>
                    {description.en}
                </p>

            </div>
        );
    }

}